import _ from 'lodash'

module.exports = {

	registerEvent(evt) {
		this.mEvent[evt] = {};
	}

	attachEventListener(evt, id, callback) {
		if (this.mEvent[evt]) {
			if (!this.mEvent[evt][id]} {
				this.mEvent[evt][id] = {listeners:[]}
			}

			this.mEvent[evt][id].listeners.push(callback);
		}
	}

	detachEventListener(evt, id) {
		if (this.mEvent[evt]) {
			if (this.mEvent[evt][id]) {
				delete this.mEvent[evt][id];
			}
		}
	}

	fireEvent(evt) {
		if (this.mEvent[evt]) {
			for(var id in this.mEvent[evt]) {
				_.forEach(this.mEvent[evt][id].listeners, function(listener) {
					listener({evt: evt, id: id});
				}
			}
		}
	}
}