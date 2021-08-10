import { useState } from "react";
import { catagoryConstants } from "../actions/authConstants"
//for adding parent only once...

const initial_state = {
    catagoryList: [],
    loading: false,
    error: '',
}
const realTimeAddCatagory = (catagories, catagory) => {
    let array = [];
    if (!catagory.parentId) {
        return [
            ...catagories,
            {
                name: catagory.name,
                _id: catagory._id,
                slug: catagory.slug,
                type: catagory.type,
                children: [],
            }
        ]
    }
    for (const cat of catagories) {
        if (cat._id == catagory.parentId) {
            array.push({
                ...cat,
                children: realTimeAddCatagory([...cat.children, {
                    name: catagory.name,
                    _id: catagory._id,
                    slug: catagory.slug,
                    parentId: catagory.parentId,
                    children: [],
                    type: catagory.type,
                }], catagory)
            })
        }
        else {
            array.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? realTimeAddCatagory(cat.children, catagory) : []
            })
        }
    }
    return array;
}
export default (state = initial_state, action) => {
    switch (action.type) {
        case catagoryConstants.CATAGORY_LIST_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case catagoryConstants.CATAGORY_LIST_SUCCESS:
            state = {
                ...state,
                catagoryList: action.payload.catagoryList,
                loading: false
            }
            break;
        case catagoryConstants.CATAGORY_LIST_FAILURE:
            state = {
                ...initial_state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_SUCCESS:
            const array = realTimeAddCatagory(state.catagoryList, action.payload.catagory)
            console.log(array)
            state = {
                ...state,
                loading: false,
                catagoryList: array,
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case catagoryConstants.UPDATE_CATAGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case catagoryConstants.UPDATE_CATAGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case catagoryConstants.UPDATE_CATAGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case catagoryConstants.DELETE_CATAGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case catagoryConstants.DELETE_CATAGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case catagoryConstants.CATAGORY_LIST_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
    }
    return state;
}