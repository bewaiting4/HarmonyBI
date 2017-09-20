import React from 'react'
import Select from 'react-select'
import DefaultFilter from '../../model/DefaultFilter'
import ENUM from './../Enums'

var optionsCategory = [{
    label: ENUM.CATEGORY.SUSPECT,
    value: ENUM.CATEGORY_VALUE.SUSPECT
}, {
    label: ENUM.CATEGORY.VICTIM,
    value: ENUM.CATEGORY_VALUE.VICTIM
}, {
    label: ENUM.CATEGORY.UNKNOWN,
    value: ENUM.CATEGORY_VALUE.UNKNOWN
}];
var optionsOnline = [{
    label: ENUM.ONLINE.SHORT,
    value: ENUM.ONLINE_VALUE.SHORT
}, {
    label: ENUM.ONLINE.TEMP,
    value: ENUM.ONLINE_VALUE.TEMP
}, {
    label: ENUM.ONLINE.LONG,
    value: ENUM.ONLINE_VALUE.LONG
}];

class SuspectFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddSuspect = this.handleAddSuspect.bind(this);
        this.handleDeleteSuspect = this.handleDeleteSuspect.bind(this);
        this._transform = this._transform.bind(this);

        this.onCatChange = this.onCatChange.bind(this);
        this.onOnlineChange = this.onOnlineChange.bind(this);

        this.suspectList = _.map(JSON.parse(DefaultFilter.numbers), function(o) {
            // number, type, serviceSpan
            return {category: o.type, phone: o.number, online: o.serviceSpan};
        });

        this.dftState = {
            category: ENUM.CATEGORY_VALUE.UNKNOWN,
            online: ENUM.ONLINE_VALUE.TEMP,
        };

        this.state = _.assign({cnt: this.suspectList.length}, this.dftState);
    }

    _transform() {
        return _.map(this.suspectList, function(o) {
            return {
                type: o.category,
                serviceSpan: o.online,
                number: o.phone
            };
        });
    }

    handleAddSuspect() {
        this.suspectList.push({
            category: this.state.category,
            online: this.state.online,
            phone: this.refs.phone.value
        });

        this.setState(_.assign({
            cnt: this.suspectList.length
        }, this.dftState));
        this.refs.phone.value = "";

        this.props.onUpdateSuspect(this._transform());
    }

    handleDeleteSuspect(suspect) {
        this.suspectList = _.filter(this.suspectList, function(o) {
            return o.phone !== suspect.phone;
        });

        this.setState({
            cnt: this.suspectList.length
        });

        this.props.onUpdateSuspect(this._transform());
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
        this.suspectList = _.map(JSON.parse(DefaultFilter.numbers), function(o) {
            // number, type, serviceSpan
            return {category: o.type, phone: o.number, online: o.serviceSpan};
        });

        this.setState({
            cnt: this.suspectList.length
        });

        this.props.onUpdateSuspect(this._transform());
    }

    render() {
        var me = this,
            suspectList = _.map(this.suspectList, function(suspect) {
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