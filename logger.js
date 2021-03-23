export default function logger(reduncer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('Prev State: ',prevState)
        console.log('Action Arguments: ',args)

        const nextState = reduncer(prevState, action, args)
        console.log('Next State: ',nextState)
        console.groupEnd()
        return nextState
    }
}

// prevState : đối tượng xử lý Object
// action    : hành động sẽ làm "delete", "cancel", "add"
// args      : biến truyền vào qua hành động action

// sử dụng logger sẽ cần return lại đúng hàm mà cần log