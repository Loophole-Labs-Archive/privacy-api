const axios = require('axios');
const crypto = require('crypto');
const sort_json = require('sort-json');
const sort_options = { ignoreCase: true, reverse: false, depth: 1};

class privacy {
    constructor(api_key, sandbox = true, version = 1) {
        this.api_key = api_key;
        this.version = version;
        this.sandbox = sandbox;

        if(this.sandbox){
            this.url = "https://sandbox.privacy.com/v"+this.version
        }
        else{
            this.url = "https://api.privacy.com/v"+this.version
        }

        var options = {
            baseURL: this.url,
            timeout: 1000,
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'privacy-api',
                'Authorization': 'api-key ' + this.api_key,
            }
        };

        this.axios = axios.create(options);
    }

    async list_cards(page = null, page_size = null, begin = null, end = null, card_token = null){
        let url = '/card?';
        
        let query = "";
        if(page != null){
            query += "page="+page.toString();
        }
        if(page_size != null){
            if(query.length > 0){
                query += "&"
            }
            query += "page_size="+page_size.toString();
        }
        if(begin != null){
            if(query.length > 0){
                query += "&"
            }
            query += "begin="+begin.toString();
        }
        if(end != null){
            if(query.length > 0){
                query += "&"
            }
            query += "end="+end.toString();
        }
        if(card_token != null){
            if(query.length > 0){
                query += "&"
            }
            query += "card_token="+card_token.toString();
        }

        try {
            return await this.axios({
                method: 'GET',
                url: url + query
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async list_transactions(approval_status = "all", page = null, page_size = null, begin = null, end = null, card_token = null, transaction_token = null){
        let url = '/transaction/'+approval_status+'?';
        
        let query = "";
        if(page != null){
            query += "page="+page.toString();
        }
        if(page_size != null){
            if(query.length > 0){
                query += "&"
            }
            query += "page_size="+page_size.toString();
        }
        if(begin != null){
            if(query.length > 0){
                query += "&"
            }
            query += "begin="+begin.toString();
        }
        if(end != null){
            if(query.length > 0){
                query += "&"
            }
            query += "end="+end.toString();
        }
        if(card_token != null){
            if(query.length > 0){
                query += "&"
            }
            query += "card_token="+card_token.toString();
        }
        if(transaction_token != null){
            if(query.length > 0){
                query += "&"
            }
            query += "transaction_token="+transaction_token.toString();
        }

        try {
            return await this.axios({
                method: 'GET',
                url: url + query
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async create_card(type = "UNLOCKED", memo = null, spend_limit = null, spend_limit_duration = null){
        let url = '/card';
        let options = {
            type: type
        }

        if(memo != null){
            options.memo = memo;
        }
        if(spend_limit != null){
            options.spend_limit = spend_limit;
        }
        if(spend_limit_duration != null){
            options.spend_limit_duration = spend_limit_duration;
        }
        
        try {
            return await this.axios({
                method: 'POST',
                url: url,
                data: options
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async update_card(card_token, state = null, memo = null, spend_limit = null, spend_limit_duration = null){
        let url = '/card';
        let options = {
            card_token: card_token
        }
        if(state != null){
            options.state = state;
        }
        if(memo != null){
            options.memo = memo;
        }
        if(spend_limit != null){
            options.spend_limit = spend_limit;
        }
        if(spend_limit_duration != null){
            options.spend_limit_duration = spend_limit_duration;
        }
        
        try {
            return await this.axios({
                method: 'PUT',
                url: url,
                data: options
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async simulate_authorization(descriptor, pan, amount){
        if(!this.sandbox){
            console.error("Cannot simulate authorizations outside of sandbox environmet");
            return {};
        }

        let url = '/simulate/authorize';

        let options = {
            descriptor: descriptor,
            pan: pan,
            amount: amount
        }
        
        try {
            return await this.axios({
                method: 'POST',
                url: url,
                data: options
            });
        } catch (error) {
            console.error(error);
            return {};
        }

    }

    async simulate_void(token, amount){
        if(!this.sandbox){
            console.error("Cannot simulate voids outside of sandbox environmet");
            return {};
        }

        let url = '/simulate/void';

        let options = {
            token: token,
            amount: amount
        }
        
        try {
            return await this.axios({
                method: 'POST',
                url: url,
                data: options
            });
        } catch (error) {
            console.error(error);
            return {};
        }

    }

    async simulate_clearing(token, amount){
        if(!this.sandbox){
            console.error("Cannot simulate clearing outside of sandbox environmet");
            return {};
        }

        let url = '/simulate/clearing';

        let options = {
            token: token,
            amount: amount
        }
        
        try {
            return await this.axios({
                method: 'POST',
                url: url,
                data: options
            });
        } catch (error) {
            console.error(error);
            return {};
        }

    }

    async simulate_return(descriptor, pan, amount){
        if(!this.sandbox){
            console.error("Cannot simulate return outside of sandbox environmet");
            return {};
        }

        let url = '/simulate/return';

        let options = {
            descriptor: descriptor,
            pan: pan,
            amount: amount
        }
        
        try {
            return await this.axios({
                method: 'POST',
                url: url,
                data: options
            });
        } catch (error) {
            console.error(error);
            return {};
        }

    }

    async hosted_card(api_key, card_uuid, css_url){
        let options = this.embed_request(api_key.toString(), card_uuid.toString(), css_url.toString());

        let url = '/embed/card?';
        let query = "embed_request="+options.embed_request+"&hmac="+options.hmac;

        try {
            return await this.axios({
                method: 'GET',
                url: url + query
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    generate_hmac(secret, message){
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(message, 'utf8');
        return hmac.digest('base64');
    }

    embed_request(api_key, card_uuid, css_url){
        let to_embed = JSON.stringify(sort_json({
            'token': card_uuid,
            'css': css_url
        }, sort_options));

        let embedded_request = Buffer.from(to_embed).toString('base64');
        let embedded_request_hmac = this.generate_hmac(api_key, to_embed);

        return {
            "embed_request": embedded_request,
            "hmac": embedded_request_hmac
        };
    }
}

module.exports = privacy;