export const checkIfReceiverExist = (to) => {
    // dummy process
    if(to && to != 'none'){
        return {
            id: to,
        };
    }
    return null;
}