
class xor {
    static encode(str) {
      return encodeURIComponent(
        str
          .toString()
          .split("")
          .map((char, ind) =>
            ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
          )
          .join("")
      );
    }
    static decode(str) {
      if (str.charAt(str.length - 1) == "/") str = str.slice(0, -1);
      return decodeURIComponent(str)
        .split("")
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
        )
        .join("");
    }
  }
self.__uv$config = {
	prefix: '//notgoogleclient.fly.dev/uv/service/',
	bare: `https://notgoogleclient.fly.dev/bare/`,
	encodeUrl: xor.encode,
	decodeUrl: xor.decode,
	handler: '/uv/uv.handler.js',
	bundle: '/uv/uv.bundle.js',
	config: '/uv/uv.config.js',
	sw: '/uv/uv.sw.js',
};