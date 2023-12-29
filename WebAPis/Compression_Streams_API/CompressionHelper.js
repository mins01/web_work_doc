/**
 * 압축/압축풀기 HELPER
 * Dependency WEB API : https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API
 * Author : mins01.com
 * Date : 2023-12-29
 */
class CompressionHelper{
	/**
	 * 
	 * @param {*} input 
	 * @param {string} compressionFormat deflate|gzip
	 * @returns {Response}
	 */
	static createCompressionResponse(input,compressionFormat) {
		return new Response(new Response(input).body.pipeThrough(new CompressionStream(compressionFormat)));
	}
	/**
	 * 
	 * @param {*} input 
	 * @param {string} compressionFormat deflate|gzip
	 * @returns {Promise} Blob 
	 */
	static compress(){
		return (this.createCompressionResponse(...arguments)).blob();
	}

	
	/**
	 * 
	 * @param {Blob} blob 
	 * @param {string} compressionFormat deflate|gzip
	 * @returns {Response} 
	 */
	static createDecompressionResponse(blob,compressionFormat) {
		return new Response(blob.stream().pipeThrough(new DecompressionStream(compressionFormat)));
	}
	/**
	 * @param {Blob} blob 
	 * @param {string} compressionFormat deflate|gzip
	 * @returns {Promise} Blob 
	 */
	static decompress(){
		return (this.createDecompressionResponse(...arguments)).blob();
	}
	
	
}