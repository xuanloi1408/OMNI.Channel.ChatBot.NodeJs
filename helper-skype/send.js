const mongodb = require('../database/mongodb');
const apiSkype = require("./apiSkype");
const config = require("../config");

const forwardSkype = async (_data) => {
    var getDataUser = await mongodb.findOne(config.mongodb.collection, {"idRoomRocket": _data.channel_id}).then(data => data).catch(data => data);
    if (getDataUser && _data.user_name.trim() != config.rocket.username) {
        getDataUser.userDetail.text = _data.text;
        await apiSkype.sendMsg(getDataUser.userDetail.serviceUrl, getDataUser.userDetail.conversation.id, getDataUser.userDetail.id, getDataUser.userDetail);
    }
}

module.exports = {forwardSkype}