//start payment
import {BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";

export const GetOnePayment = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.payment, id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
//end payment