import autodux from 'autodux';

export const {
  reducer,
  actions
} = autodux ( {
  slice: 'faceId',
  initial: { 
    isLoading: false,
    error: null,
    data: null,
    activeDataId: null
  },
  actions: { 
    isLoading: ( state, isLoading ) => { 
      return { 
        ...state,
        isLoading
      };
    },
    loadSuccess: ( state, data ) => {
      return {
        ...state,
        data
      };
    },
    setActiveDataId: ( state, activeDataId ) => {
      return {
        ...state,
        activeDataId
      };
    }
  }
} );