import Promise from 'promise-polyfill';
import 'whatwg-fetch'
import DefaultFilter from './DefaultFilter'

// To add to window.
if (!window.Promise) {
    window.Promise = Promise;
}

var callbacks = [];

class Model {
    getFilter() {
        // TODO: Should get filter conditions from fitler panel.
        return this.condition || DefaultFilter;
    }

    setFilter(condition) {
        this.condition = condition;
    }

    getSuspectData(callback) {
        fetch('/api/suspect', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(resData => {
                callback(resData);
            }).catch(ex => {
                console.log('Getting suspect data failed', ex)
            });
    }

    getSuspect(id, callback) {
        fetch('/api/suspect/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(resData => {
                callback(resData);
            }).catch(ex => {
                console.log('Getting suspect data failed', ex)
            });

    }

    addSuspect(info, callback) {
        fetch('/api/suspect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(resData => {
                callback(resData);
            }).catch(ex => {
                console.log('Getting suspect data failed', ex)
            });
    }

    updateSuspect(id, info, callback) {
        fetch('/api/suspect/:' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(resData => {
                callback(resData);
            }).catch(ex => {
                console.log('Getting suspect data failed', ex)
            });
    }

    deleteSuspect(info, callback) {
        fetch('/api/suspect', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(resData => {
                callback(resData);
            }).catch(ex => {
                console.log('Getting suspect data failed', ex)
            });
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

            callbacks = [callback];

            fetch('/api/viz', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filter)
                })
                .then(res => res.json())
                .then(resData => {

                    callbacks.forEach(function (callback) {
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

module.exports = function () {
    if (!model) {
        model = new Model();
    }

    return model;
};
