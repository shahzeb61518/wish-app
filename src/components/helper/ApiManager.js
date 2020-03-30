import axios from 'axios';

export default class ApiManager {

    // LocalHost
    _BASE_URL = "http://localhost:4000/api/"
    // _BASE_URL = "https://testing-app-backend.herokuapp.com/api/"

    // FEEDBACK
    _ADD_WISH = "wish/add"
    _GET_WISH_LIST = "wish/get"
    _DELETE_WISH = "wish/delete"
    _GET_WISH_BY_ID = "wish/get"
    _CHECK_AUTH = "admin/checkauth"

    // async sendGetRequest(_url, _params, _headers) {
    //     _url = this._BASE_URL + _url;
    //     console.log("API _url", _url)

    //     if (!_headers) {
    //         _headers = {
    //             'Content-Type': 'application/json',
    //         }
    //     }

    //     try {
    //         let response = await axios.get(_url, {
    //             data: _params ? _params : null,
    //             headers: _headers,
    //             timeout: 15000
    //         });

    //         console.log("API call response", response)
    //         return response;

    //     } catch (error) {
    //         let err = [];
    //         err.error = error;
    //         err.no_result = true;
    //         // console.log("catch error on ", _url, " call fail", err)
    //         setTimeout(() => {
    //             alert("Unable to connect with server")
    //         }, 400)
    //         return err;
    //     }
    // }

    async sendPostRequest(_url, _params, headers) {
        _url = this._BASE_URL + _url;
        console.log("API _url", _url)
        // console.log("my jwt token>>>>>>.", headers)

        if (!_params) {
            _params = {}
        }
        if (!headers) {
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        try {
            let response = await axios({
                method: 'post',
                url: _url,
                headers: headers,
                data: _params,
                timeout: 50000
            });
            console.log("API call response", response)
            return response;

        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            console.log("catch error on ", _url, " call fail", err)
            setTimeout(() => {
                alert("Unable to connect with server")
            }, 400)
            return err;
        }
    }

    // WISH FUNCTIONS
    //Adding WISH
    addWish(
        _title,
        _description,
        _videoLink,
    ) {
        let url = this._ADD_WISH;
        let wishData = {
            title: _title,
            description: _description,
            videoLink: _videoLink
        }
        console.log("data for adding>>>>>", wishData)
        return this.sendPostRequest(url, wishData, this.headers)
    }

    // Get WISH List
    getWishList() {
        let url = this._GET_WISH_LIST;
        return this.sendPostRequest(url, this.headers)
    }

    // Get WISH List
    getWishById(id) {
        let url = this._GET_WISH_BY_ID;
        let wishId = { id: id }
        console.log("getting wish by this id>>>>", id)
        return this.sendPostRequest(url, wishId, this.headers)
    }

    // Deleting Wish
    deleteWish(id) {
        console.log("delete this id>>>>", id)
        let wishId = { id: id }
        let url = this._DELETE_WISH;
        return this.sendPostRequest(url, wishId, this.headers)
    }


    //Admin login Check
    // checkAuth(
    //     _username,
    //     _password,
    // ) {
    //     let url = this._CHECK_AUTH;
    //     let adminData = {
    //         username: _username,
    //         password: _password,
    //     }
    //     console.log("data for login>>>>>", adminData)
    //     return this.sendPostRequest(url, adminData, this.headers)
    // }
}
