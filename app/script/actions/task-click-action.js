export const taskClick = (task) => {
    console.log(task.description);
    return {
        type:  "TASK_CLICKED",
        payload: task
    }
};
