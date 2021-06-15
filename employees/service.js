
import { DATA } from './employees-json';

// lesson 2
// Реализовать функцию для поиска сотрудника по имени и фамилии

    export
    function findByName(name, surname) {
    let res = [];
    for (var e of DATA.employees) {
        if ((!name || e.name === name) &&
            (!surname || e.surname === surname)) {
            res.push(e);
        }
    }
    return res;
}

// Реализовать функцию для добавления сотрудника по имени и фамилии.

    export
    function addEmployee(name, surname) {
    if (!name || name.length == 0 || !surname || surname.length == 0) {
        throw new Error("name and surname should be not empty");
    }
    let max = 0;
    for (let e of DATA.employees) {
        if (e.id > max) max = e.id;
            }
    let id = max + 1;
    DATA.employees.push({ id, name, surname });
    return id;
}

// Разработать функцию для удаления сотрудника по id.

    export
    function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id===id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}

//  Разработать функцию для вывода в консоль всей информации по сотруднику. (console)

    function
    showEmployee(employee) {
    const keys = Object.keys(employee);
    console.log("Информация о сотруднике "+employee["name"]+":");
    for (let key of keys) {
        console.log(key+ " = "+employee[key]);
    }
}

// Реализовать функцию, выводящую список всех сотрудников. (list)

    function showEmployees() {
    for (let e of DATA.employees) {
        showEmployee(e);
    }
}

// Занятие 3. Работа со строками и датами.
// Написать функцию, которая будет находить сотрудника по id

    export
    function findById(id) {
    for (const e of DATA.employees) {
        if (id==e.id) {
            return e;
        }
    }
}

// 2) Оптимизировать поиск по id: использовать объект для кэширования.


    const employeeMap = {};

    export
    function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }
    for (var e of DATA.employees) {
        if (id==e.id) {
            employeeMap[id] = e;
            return e;
        }
    }
}

// Реализовать метод для добавления телефона сотрудника.

    function addPhone(id, phone) {
    const employee = findById(id);
    const phones = employee.phones;
    if (!phones) {
        employee.phones = [];
    }
    employee.phones.push(phone);
}
// Реализовать метод, устанавливающий дату рождения сотрудника

    function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = date;

// Реализовать метод, возвращающий возраст сотрудника.

        function getAge(id) {
            const employee = findById(id);
        }
            let ageDiff = Date.now() - employee.dateOfBirth.getTime();
            let ageDate = new Date(ageDiff);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

// Написать функцию, форматирующую дату и возвращающую ее в формате дд.мм.гггг.

            function formatDate(date) {
            let day = date.getDate();
            if (day<10) day = '0'+day;
            let month = date.getMonth()+1;
            if (month<10) month = '0'+month;
            let year = date.getFullYear();

            return day + '.' + month + '.' + year;
        }

// Написать функцию, возвращающую подробную информацию о сотруднике.

    function getEmployeeInfo(id) {
    const e = findById(id);

    const phones = e.phones?
        `Список телефонов: ${e.phones}`:'';
    const age = e.dateOfBirth?
        `Возраст: ${getAge(e.id)}`:'';
    return `  
  Имя: ${e.name} 
  Фамилия: ${e.surname} 
  Дата рождения: ${formatDate(e.dateOfBirth)} 
  ${phones}  
  ${age} 
`;
}

// Написать тестовую функцию, которая добавляет сотрудника, добавляет телефоны

    function testEmployee() {
    addPhone(133, "555-55-55");
    addPhone(133, "666-66-66");
    setDateOfBirth(133, new Date(2000,1,1))
    const info = getEmployeeInfo(133);
    console.log(info);
}

// Написать функцию, которая выводит информацию о сотруднике в формате JSON строки

    function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

//блок 3
// перерисовать список всех сотрудников

// удаляем сотрудника

    export
    function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id===id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}
//перерисовать

    function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(DATA.employees);
}
    export
    function setEmployeeManager(id, managerId) {
    const employee = findById(id);
    employee.managerRef = managerId;
}

//задание 3 2021-06-10
// функция должна возвращать сотрудников по заданным параметрам

    function searchEmployees(name, surname, managerRef) {
    let results = [];
    for (let e of DATA.employees) {
        if ((!name || e.name==name) &&
            (!surname || e.surname==surname) &&
            (!managerRef || e.managerRef==managerRef)) {
            results.push(e);
        }
    }
    return results;
}