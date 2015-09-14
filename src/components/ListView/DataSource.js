

function defaultGetRowData(dataBlob, sectionID, rowID) {
  return dataBlob[sectionID][rowID];
}

function defaultGetSectionHeaderData(dataBlob, sectionID) {
  return dataBlob[sectionID];
}

function countRows(allRowIDs){
  var totalRows = 0;
  for(var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++){
    var rowIDs = allRowIDs[sectionIdx];
    totalRows += rowIDs.length;
  }
  return totalRows;
}

function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else if (typeof obj === 'object') {
    for (var i in obj) {
      return false;
    }
    return true;
  } else {
    return !obj;
  }
}

function keyedDictionaryFromArray(arr){
  if(isEmpty(arr)){
    return {};
  }
  var result = {};
  for(var ii = 0; ii < arr.length; ii++){
    result[arr[ii]] = true;
  }
  return result;
}

class ListViewDataSource {
  /**
   * You can provide custom extraction and `hasChanged` functions for section
   * headers and rows.  If absent, data will be extracted with the
   * `defaultGetRowData` and `defaultGetSectionHeaderData` functions.
   *
   * The default extractor expects data of one of the following forms:
   *
   *      { sectionID_1: { rowID_1: <rowData1>, ... }, ... }
   *
   *    or
   *
   *      { sectionID_1: [ <rowData1>, <rowData2>, ... ], ... }
   *
   *    or
   *
   *      [ [ <rowData1>, <rowData2>, ... ], ... ]
   *
   * The constructor takes in a params argument that can contain any of the
   * following:
   *
   * - getRowData(dataBlob, sectionID, rowID);
   * - getSectionHeaderData(dataBlob, sectionID);
   * - rowHasChanged(prevRowData, nextRowData);
   * - sectionHeaderHasChanged(prevSectionData, nextSectionData);
   */
  constructor(params) {
    this._sectionHeaderHasChanged = params.sectionHeaderHasChanged;

    this._rowHasChanged = params.rowHasChanged;
    this._getRowData = params.getRowData || defaultGetRowData;
    this._getSectionHeaderData = params.getSectionHeaderData || defaultGetSectionHeaderData;

    this._dataBlob = null;
    this._dirtyRows = [];
    this._dirtySections = [];
    this._cachedRowCount = 0;

    this.rowIdentities = [];
    this.sectionIdentities = [];
  }

  /**
   * Clones this `ListViewDataSource` with the specified `dataBlob` and
   * `rowIdentities`. The `dataBlob` is just an aribitrary blob of data. At
   * construction an extractor to get the interesting informatoin was defined
   * (or the default was used).
   *
   * The `rowIdentities` is is a 2D array of identifiers for rows.
   * ie. [['a1', 'a2'], ['b1', 'b2', 'b3'], ...].  If not provided, it's
   * assumed that the keys of the section data are the row identities.
   *
   * Note: This function does NOT clone the data in this data source. It simply
   * passes the functions defined at construction to a new data source with
   * the data specified. If you wish to maintain the existing data you must
   * handle merging of old and new data separately and then pass that into
   * this function as the `dataBlob`.
   */
  cloneWithRows(dataBlob, rowIdentities) {
    var rowIds = rowIdentities ? [rowIdentities] : null;
    if (!this._sectionHeaderHasChanged) {
      this._sectionHeaderHasChanged = () => false;
    }
    return this.cloneWithRowsAndSections({ s1: dataBlob }, ['s1'], rowIds);
  }

  /**
   * This performs the same function as the `cloneWithRows` function but here
   * you also specify what your `sectionIdentities` are. If you don't care
   * about sections you should safely be able to use `cloneWithRows`.
   *
   * `sectionIdentities` is an array of identifiers for  sections.
   * ie. ['s1', 's2', ...].  If not provided, it's assumed that the
   * keys of dataBlob are the section identities.
   *
   * Note: this returns a new object!
   */

  cloneWithRowsAndSections(dataBlob, sectionIdentities, rowIdentities) {
    var newSource = new ListViewDataSource({
      getRowData: this._getRowData,
      getSectionHeaderData: this._getSectionHeaderData,
      rowHasChanged: this._rowHasChanged,
      sectionHeaderHasChanged: this._sectionHeaderHasChanged
    });
    newSource._dataBlob = dataBlob;

    if (sectionIdentities) {
      newSource.sectionIdentities = sectionIdentities;
    } else {
      newSource.sectionIdentities = Object.keys(dataBlob);
    }

    if (rowIdentities) {
      newSource.rowIdentities = rowIdentities;
    } else {
      newSource.rowIdentities = [];
      newSource.sectionIdentities.forEach((sectionID) => {
        newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]));
      });
    }
    newSource._cachedRowCount = countRows(newSource.rowIdentities);

    newSource._calculateDirtyArrays(
      this._dataBlob,
      this.sectionIdentities,
      this.rowIdentities
      );

    return newSource;
  }

  getRowCount() {
    return this._cachedRowCount;
  }

  /**
   * Returns if the row is dirtied and needs to be rerendered
   */
  rowShouldUpdate(sectionIndex, rowIndex) {
    return this._dirtyRows[sectionIndex][rowIndex];
  }

  /**
   * Gets the data required to render the row.
   */
  getRowData(sectionIndex, rowIndex) {
    var sectionID = this.sectionIdentities[sectionIndex];
    var rowID = this.rowIdentities[sectionIndex][rowIndex];
    return this._getRowData(this._dataBlob, sectionID, rowID);
  }

  /**
   * Gets the rowID at index provided if the dataSource arrays were flattened,
   * or null of out of range indexes.
   */
  getRowIDForFlatIndex(index) {
    var accessIndex = index;
    for (var ii = 0; ii < this.sectionIndentities.length; ii++) {
      if (accessIndex >= this.rowIdentities[ii].length) {
        accessIndex -= this.rowIdentities[ii].length;
      } else {
        return this.rowIdentities[ii][accessIndex];
      }
    }
    return null;
  }
  
  /**
  * Gets the sectionID at index provided if the dataSource arrays were flattened,
  * or null for out of range indexes.
  */
  getSectionIDForFlatIndex(index) {
    var accessIndex = index;
    for (var ii = 0; ii < this.sectionIndentities.length; ii++) {
      if (accessIndex >= this.rowIdentities[ii].length) {
        accessIndex -= this.rowIdentities[ii].length;
      } else {
        return this.sectionIdentities[ii];
      }
    }
    return null;
  }
  

  /**
  * Returns an array containing the number of rows in each section
  */
  getSectionLengths() {
    var results = [];
    for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
      results.push(this.rowIdentities[ii].length);
    }
    return results;
  }

  /**
  * Returns if the section header is dirtied and needs to be rerendered
  */
  sectionHeaderShouldUpdate(sectionIndex) {
    return this._dirtySections[sectionIndex];
  }

  /**
  * Gets the data required to render the section header
  */
  getSectionHeaderData(sectionIndex) {
    if (!this._getSectionHeaderData) {
      return null;
    }
    var sectionID = this.sectionIdentities[sectionIndex];
    return this._getSectionHeaderData(this._dataBlob, ssectionID);
  }


  /**
  * Private members and methods.
  */
  _calculateDirtyArrays(prevDataBlob, prevSectionIDs, prevRowIDs) {
    var prevSectionsHash = keyedDictionaryFromArray(prevSectionIDs);
    var prevRowsHash = {};
    for (var ii = 0; ii < prevRowIDs.length; ii++) {
      var sectionID = prevSectionIDs[ii];
      prevRowsHash[sectionID] = keyedDictionaryFromArray(prevRowIDs[ii]);
    }

    this._dirtySections = [];
    this._dirtyRows = [];

    var dirty;
    for (var sIndex = 0; sIndex < this.sectionIdentities.length; sIndex++) {
      dirty = !prevSectionsHash[sectionID];
      var sectionHeaderHasChanged = this._sectionHeaderHasChanged;
      if (!dirty && sectionHeaderHasChanged) {
        dirty = sectionHeaderHasChanged(
          this._getSectionHeaderData(prevDataBlob, sectionID),
          this._getSectionHeaderData(this._dataBlob, sectionID)
          );
      }

      this._dirtySections.push(!!dirty);

      this._dirtyRows[sIndex] = [];
      for (var rIndex = 0; rIndex < this.rowIdentities[sIndex].length; rIndex++) {
        var rowID = this.rowIdentities[sIndex][rIndex];

        dirty = !prevSectionsHash[sectionID] || !prevRowsHash[sectionID][rowID] || this._rowHasChanged(
          this._getRowData(prevDataBlob, sectionID, rowID),
          this._getRowData(this._dataBlob, sectionID, rowID));
        this._dirtyRows[sIndex].push(!!dirty);
      }
    }
  }
}

module.exports = ListViewDataSource;