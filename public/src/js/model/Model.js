import Promise from 'promise-polyfill';
import 'whatwg-fetch'

// To add to window.
if (!window.Promise) {
    window.Promise = Promise;
}

var callbacks = [];

class Model {
    getFilter() {
        // TODO: Should get filter conditions from fitler panel.
        return {
            test: 'abc'
        };
    }

    getVizData(callback) {

        var filter = this.getFilter(),
            me = this;

        if (JSON.stringify(filter) === JSON.stringify(this._lastFilter)) {
            if (this._isLoading) {
                callbacks.push(callback);
            } else {
                callback(this._vizData);
            }
        } else {
            this._isLoading = true;

            this._lastFilter = filter;

            callbacks = [ callback ];

            fetch('/api/viz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            })
            .then(res => res.json())
            .then(resData => {

                callbacks.forEach(function(callback) {
                    callback(resData);
                });

                callbacks = [];

                me._vizData = resData;

                me._isLoading = false;
            }).catch(ex => {
                console.log('Getting viz data failed', ex)
            });
        }
    }
}

var model;

module.exports = function() {
    if (!model) {
        model = new Model();
    }

    return model;
};