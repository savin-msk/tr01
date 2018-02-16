import axios from 'axios'
import {eventHub} from './eventhub.js'

function createAxios() {
    var reader = axios.create({
        baseURL: 'https://lxd.avenu77.ru:9000'
    })
    reader.interceptors.request.use(
        conf => {
            console.log('before-request')
            eventHub.$emit('before-request')
            return conf
        },
        error => {
            eventHub.$emit('request-error')
            return Promise.reject(error)
        }
    )
    reader.interceptors.response.use(
        response => {
            console.log('after-request')
            eventHub.$emit('after-response')
            return response
        },
        error => {
            eventHub.$emit('response-error')
            return Promise.reject(error)
        }
    )
    return reader
}

export const HTTPS =  createAxios()