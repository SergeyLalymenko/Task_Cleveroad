import { api, fire } from '../../firebase'



const initialData = {
    title: 'Большой торт единорожка',
    cost: '345',
    description: 'Описание для торта',
    discount: '15',
    discountTo: '2020-12-30',
    url: 'https://firebasestorage.googleapis.com/v0/b/react-test-339ff.appspot.com/o/images%2Fcupcakes.jpg?alt=media&token=adcc0d8b-a897-416f-ac80-a71b3a7f29c3',
}

export const SET_STICKERS = 'SET_STICKERS'
export const fetchStickers = () => (dispatch) => {
    const userId = fire.auth().currentUser.uid;
    api.collection(userId).get()
        .then(({docs}) =>  {
            const data = docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch({type: SET_STICKERS, payload: data})
        });
}

export const changeSticker = (id, url, values) => (dispatch) => {
    const userId = fire.auth().currentUser.uid;
    const newSticker = {
        ...values,
        url: url
    }
    api.collection(userId).doc(id).set(newSticker)
        .then(() => api.collection(userId).get())
        .then(({docs}) => {
            const data = docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch({type: SET_STICKERS, payload: data})
        })
}

export const addSticker = (url, values) => (dispatch) => {
    const userId = fire.auth().currentUser.uid;
    const newSticker = {
        ...values,
        url: url
    }
    api.collection(userId).add(newSticker)
        .then(() => api.collection(userId).get())
        .then(({docs}) => {
            const data = docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch({type: SET_STICKERS, payload: data})
        })
}

export const deleteSticker = (id) => (dispatch) => {
    const userId = fire.auth().currentUser.uid;
    api.collection(userId).doc(id).delete()
        .then(() => api.collection(userId).get())
        .then(({docs}) => {
            const data = docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch({type: SET_STICKERS, payload: data})
        })
}

export const addNewCollection = () => (dispatch) => {
    const userId = fire.auth().currentUser.uid;
    api.collection(userId).add(initialData)
        .then(() => api.collection(userId).get())
        .then(({docs}) => {
            const data = docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch({type: SET_STICKERS, payload: data})
        })
}