'use strict';

const redis = require('redis')

module.exports = class Redis {

    constructor() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        })

        this.client.on('error', (err) => {
            if (err) {
                console.log(`Redis Error ${err}`);
            }
        })
    }

    /**
     * - Saves a new key with data
     * @param  {String} key    - Key to save
     * @param  {String} exp    - cache expiration
     * @param  {Array}  fields - Fields to save
     * @return {*}             - Success message or error
     */
    save(key, exp, fields = []) {
        return new Promise((resolve, reject) => this.client
            .setex(key, exp, fields, (err, reply) => (err) ?
                reject(err) :
                resolve('success')
            )
        )
    }

    get(key) {
        return new Promise((resolve, reject) => this.client
            .get(key, (err, obj) => (err) ?
                reject(err) :
                resolve(obj)
            )
        );
    }

}
