import React from 'react'
import Select from 'react-select'
import DefaultFilter from '../../model/DefaultFilter'
import ENUM from './../Enums'

var optionsCategory = [{
    label: ENUM.CATEGORY_MAP[ENUM.CATEGORY_KEY.SUSPECT],
    value: ENUM.CATEGORY_KEY.SUSPECT
}, {
    label: ENUM.CATEGORY_MAP[ENUM.CATEGORY_KEY.VICTIM],
    value: ENUM.CATEGORY_KEY.VICTIM
}, {
    label: ENUM.CATEGORY_MAP[ENUM.CATEGORY_KEY.UNKNOWN],
    value: ENUM.CATEGORY_KEY.UNKNOWN
}];
var optionsOnline = [{
    label: ENUM.ONLINE_MAP[ENUM.ONLINE_KEY.SHORT],
    value: ENUM.ONLINE_KEY.SHORT
}, {
    label: ENUM.ONLINE_MAP[ENUM.ONLINE_KEY.TEMP],
    value: ENUM.ONLINE_KEY.TEMP
}, {
    label: ENUM.ONLINE_MAP[ENUM.ONLINE_KEY.LONG],
    value: ENUM.ONLINE_KEY.LONG
}];

class SuspectFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddSuspect = this.handleAddSuspect.bind(this);
        this.handleDeleteSuspect = this.handleDeleteSuspect.bind(this);
        this._transform = this._transform.bind(this);

        this.onCatChange = this.onCatChange.bind(this);
        this.onOnlineChange = this.onOnlineChange.bind(this);

        this.dftState = {
            category: ENUM.CATEGORY_KEY.UNKNOWN,
            online: ENUM.ONLINE_KEY.TEMP,
            suspectList: _.map(JSON.parse(DefaultFilter.numbers), function(o) {
                // number, type, serviceSpan
                return {category: o.type, phone: o.number, online: o.serviceSpan};
            })
        };

        this.state = _.assign({}, this.dftState);
    }

    componentDidMount() {
        this.setState({
            suspectList: _.map(this.props.suspects, function(o) {
                // number, type, serviceSpan
                return {category: o.type, phone: o.number, online: o.serviceSpan};
            })
        });
    }

    _transform(list) {
        return _.map(list, function(o) {
            return {
                type: o.category,
                serviceSpan: o.online,
                number: o.phone
            };
        });
    }

    handleAddSuspect() {
        var list = this.state.suspectList.slice();

        list.push({
            category: this.state.category,
            online: this.state.online,
            phone: this.refs.phone.value
        });

        this.setState({
            suspectList: list
        });

        this.refs.phone.value = "";

        this.props.onUpdateSuspect(this._transform(list));
    }

    handleDeleteSuspect(suspect) {
        var list = _.filter(this.state.suspectList, function(o) {
            return o.phone !== suspect.phone;
        });
        this.setState({
            suspectList: list
        });

        this.props.onUpdateSuspect(this._transform(list));
    }

    onCatChange(val) {
        this.setState({
            category: val
        });
    }

    onOnlineChange(val) {
        this.setState({
            online: val
        });
    }

    resetFilter() {
        this.setState(_.assign({}, this.dftState));

        this.props.onUpdateSuspect(this._transform(this.dftState.suspectList));
    }

    render() {
        var me = this,
            suspectList = _.map(this.state.suspectList, function(suspect) {
                return <ul key={suspect.phone} className="list">
                    <span className="phone_search">{suspect.phone}</span>			 
                	<Select simpleValue options={optionsCategory} placeholder="身份" value={suspect.category} className="category"/>
                    <Select simpleValue options={optionsOnline} placeholder="续网" value={suspect.online} className="online"/>
                    <div className="upload_img">
                        <img/> 
                    </div>			 
                    <button className="delete" onClick ={me.handleDeleteSuspect.bind(me, suspect)}>
                        <i className="fa fa-remove" aria-hidden="true"></i> 
                    </button> 
                </ul>
            });

        return <div className = "tab_suspect filter_nav" >
            <li>
                <ul className = "list title" >
                    <input className = "phone_search" ref="phone"/>
                    <Select simpleValue options = { optionsCategory } placeholder = "身份" value = { this.state.category } className = "category" onChange = { this.onCatChange }/> 
                    <Select simpleValue options = { optionsOnline } placeholder = "续网" value = { this.state.online } className = "online" onChange = { this.onOnlineChange }/> 
                    <button disabled className = "upload_img" > 上传照片 < /button> 
                     <button className = "add" onClick = { this.handleAddSuspect } > 添加 < /button> 
                </ul> 
                {suspectList}
            </li> 
        </div>
    }

}

module.exports = SuspectFilter;