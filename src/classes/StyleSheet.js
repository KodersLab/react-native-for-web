// This class actually does nothing as styles are passed as object internally
// TODO: For development-sake, maybe we should freeze the object so, as in react native
// it will became read-only
class StyleSheet{
	// returns a style object as it is atm. Read above.
	static create(styleObject){
		return styleObject;
	}
}

module.exports = StyleSheet;