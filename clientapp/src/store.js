import { configureStore } from '@reduxjs/toolkit'
import guestReducer from './reducers/guestReducer'
import commonReducer from './reducers/commonReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        guests: guestReducer,
        common: commonReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
   })
  })

  export default store