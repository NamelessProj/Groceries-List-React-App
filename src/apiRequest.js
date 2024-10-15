const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if(!response.ok){
            throw new Error('Thanks to reload the page.'); // If the db doesn't load
        }
    }catch(err) {
        errMsg = err.message;
    }finally {
        return errMsg;
    }
}

export default apiRequest;