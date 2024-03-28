async function getAlllUsersData(userid){
    const tablerosResponse = await fetch(`http://localhost:3500/tableros/user/${userid}`);
    const tableros = await tablerosResponse.json();
    // console.log('tableros', tableros);

    // 
    const containersPromises = tableros.map(tablero => {
        return fetch(`http://localhost:3500/tableros/${tablero.id_tablero}/containers`).then(data => data.json())
    });
    // console.log(containersPromises);
    const containers = await Promise.all(containersPromises);
    // console.log('containers', containers);

    const todosPromises = containers.map(tableroContainers => {
        if(!tableroContainers.error){
            return tableroContainers.map(tc => 
                fetch(`http://localhost:3500/containers/${tc.ID_CONTAINER}/todos`).then(data => data.json()))
        } else {
            return null;
        }
    });
    // console.log('todosPromises',todosPromises);
    const todos = await Promise.all(todosPromises.map(promises => {
        if(promises == null) return null;
        return Promise.all(promises.map(promise => promise));
    }));
    // console.log('todos', todos);

    const allData = [];

    const containersWithTodos = containers.map((containersGroup, indexCG) => {
        if(containersGroup.error) {
            return [];
        } else {
            return containersGroup.map((container, indexC) => {
                if(todos[indexCG][indexC].error){
                    return [container.NOMBRE, []]
                } else {
                    return [container.NOMBRE, todos[indexCG][indexC]]
                }
            })
        }
    });

    // console.log('containerWithTOdos', containersWithTodos);

    tableros.map((tablero, index) => {
        allData.push([{id: tablero.id_tablero, nombre: tablero.nombre}, containersWithTodos[index]]);
    })
    // console.log('allData', allData);

    return(allData);
}

export {getAlllUsersData}