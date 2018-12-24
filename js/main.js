
var app = new Vue({
	el: '#app',
	data: {
		json: null
	},
	created: function () {
      fetch("/data/wocka-jokes.json")
        .then(r => r.json())
        .then(json => {
          this.json=json;
        });
    }
	
});
