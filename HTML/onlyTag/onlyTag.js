onlyTag = {
	"stripAttributes":function(text){
		return text.replace(/(<[^\s>]+)(\s*[^>]*)(>)/g,'$1$3')
	}
}