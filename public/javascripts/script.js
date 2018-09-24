var last
var test = false
action()
function clicker(id) {
    var name = "section" + " active"

    if (last != null && last != id) {
        if (document.getElementById("section_" + last).className === name) {
            document.getElementsByClassName("element")[last - 1].style.height = 0
        }
        document.getElementById("section_" + last).childNodes[5].style.transform = "rotate(0deg)"
        document.getElementById("section_" + last).className = "section"
    }
    last = id
    if (document.getElementById("section_" + id).className === name) {
        document.getElementById("section_" + id).childNodes[5].style.transform = "rotate(0deg)"
        document.getElementsByClassName("element")[id - 1].style.height = 0
        document.getElementById("section_" + id).className = "section"
    }
    else {
        document.getElementById("section_" + id).className += " active"
        document.getElementById("section_" + id).childNodes[5].style.transform = "rotate(-90deg)"
        var hei = document.getElementById("element_" + id).childElementCount * 35
        document.getElementsByClassName("element")[id - 1].style.height = hei + "px"
    }
}

function slide() {

    if (document.getElementById("nav-bar").className === "topClassActive") {
        document.getElementById("info_user").style.width = 0
        document.getElementById("nav-bar").className = "topClass"

    }
    else {
        document.getElementById("nav-bar").className = "topClassActive"
        document.getElementsByClassName("none").className += "nonebar"
        var hei = document.getElementById("info_user").childElementCount * 40
        document.getElementById("info_user").style.width = hei + "px"
    }
}


function synchronize(parent, child) {
    var ajax;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest()
    } else {
    }
    ajax.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('content').innerHTML = this.responseText
            action()
        }
    }
    ajax.open('GET', `/${parent}/${child}`, true)
    ajax.setRequestHeader("Content-Type", "text/html")
    ajax.send(null);


}
window.onload = function () {
    if (test) {
        document.getElementById('rightSide').style.height = window.innerHeight + 'px';
        document.getElementById('rightSide').style.width = (window.innerWidth ) + 'px';
        document.getElementById('content').style.height = (window.innerHeight - 54) + 'px';
        document.getElementById('content').style.width = (window.innerWidth ) + 'px';
        if (document.getElementById('table1') != null) {
            document.getElementById('table1').style.width = (window.innerWidth - 230) + 'px';
        }
        if (document.getElementById('table') != null) {
            document.getElementById('table').style.width = (window.innerWidth - 230) + 'px';
        }

    }
    else {
        if (document.getElementById('table1') != null) {
            document.getElementById('table1').style.width = (window.innerWidth  ) + 'px';
        }
        if (document.getElementById('table') != null) {
            document.getElementById('table').style.width = (window.innerWidth) + 'px';
        }
        setSize()

    }
    action()
}

window.onresize = function () {
    if (test) {
        document.getElementById('rightSide').style.height = window.innerHeight + 'px';
        document.getElementById('rightSide').style.width = (window.innerWidth ) + 'px';
        document.getElementById('content').style.height = (window.innerHeight - 54) + 'px';
        document.getElementById('content').style.width = (window.innerWidth ) + 'px';
        if (document.getElementById('table1') != null) {
            document.getElementById('table1').style.width = (window.innerWidth) + 'px';
        }
        if (document.getElementById('table') != null) {
            document.getElementById('table').style.width = (window.innerWidth ) + 'px';
        }

    }
    else {
        if (document.getElementById('table1') != null) {
            document.getElementById('table1').style.width = (window.innerWidth - 230 ) + 'px';
        }
        if (document.getElementById('table') != null) {
            document.getElementById('table').style.width = (window.innerWidth - 230) + 'px';
        }
        setSize()

    }
}
function setSize() {
    document.getElementById('rightSide').style.height = window.innerHeight + 'px';
    document.getElementById('rightSide').style.width = (window.innerWidth - 230) + 'px';
    document.getElementById('content').style.height = (window.innerHeight - 54) + 'px';
    document.getElementById('content').style.width = (window.innerWidth - 230) + 'px';
    document.getElementById('accordion').style.height = (window.innerHeight - 200) + 'px';

}


var section
function getIndex(id) {
    if (id === "alimentaire") return 0;
    else if (id === "Cleaner") return 1;
    else return 2;
}
    function getElem(id) {
    if (id === 0) return "alimentaire";
    else if (id === 1) return "Cleaner";
    else return "Medoc";
}
function ListSlide(id) {
    var index = getIndex(id);

    if (section != null) {
        var last = getElem(section)
        document.getElementById(last).getElementsByTagName("img")[0].style.transform = "rotate(0deg)"
        document.getElementsByClassName("list_contenu")[section].style.height = 0;
    }
    if (section != index) {
        document.getElementById(id).getElementsByTagName("img")[0].style.transform = "rotate(-90deg)"
        var hei = document.getElementsByClassName("list_contenu")[index].getElementsByTagName("tbody")[0].childElementCount
        document.getElementsByClassName("list_contenu")[index].style.height = (hei + 1) * 41 + "px"
        section = index
    }
    else
        section = null
}
function action() {
    if (document.getElementById('submitSalle') !== null) {

        document.getElementById('submitSalle').onclick = function (e) {
            console.log("submitSalle")
            if (e.target.form.checkValidity()) {
                e.preventDefault()

                var data = {
                    "chamberId": 0,
                    "name": [],
                    "quantity": []
                }
                var inputs = [].slice.call(e.target.form.getElementsByTagName('input'));
                var selects = [].slice.call(e.target.form.getElementsByTagName('select'))
                inputs.forEach(input => {
                    if (input.name !== "nb" && input.name !== "add" && input.value !== "nb" && input.value !== "add")
                        if (input.name === "name")
                            data["name"].push(input.value)
                        else if (input.name === "quantity"){
                                    if(input.value === "") input.value = 0;
                                data["quantity"].push(input.value)
                            }
                        else if (input.name === "chamber_Id")
                            data["salleName"] = input.value
                        else
                            data[input.name] = input.value
                });
                selects.forEach(select => {
                    if (select.value !== "NaN")
                        data["salleName"] = select.value;
                });
                console.log(data)
                console.log(data.quantity.length)
                //if(data.quantity.length === 0) data.quantity.push(0);
                var ajax;

                if (window.XMLHttpRequest) {
                    ajax = new XMLHttpRequest()
                } else {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP")
                }
                start()
                ajax.onload = function () {
                    if (this.readyState === 4 && this.status === 200) {

                        Push.create("   القاعات", {
                            body: "   تمت إضافة الأجهزة بنجاح  ",
                            icon: 'images/checked.png',
                            timeout: 4000,
                            onClose: function () {
                                end()
                            }
                        });
                        document.getElementById('content').innerHTML = this.responseText
                        action()
                    } else {
                        Push.create("   القاعات", {
                            body: "   خطأ في عملية الاضافة ، المرجو إعادة المحاولة ",
                            icon: 'images/cancel.png',
                            timeout: 4000,
                            onClose: function () {
                                end()
                            }
                        });
                    }
                }
                ajax.open('POST', '/sales/save', true)
                ajax.setRequestHeader("Content-Type", "application/json")
                ajax.send(JSON.stringify(data));
            }

        }
    }
    if (document.getElementById('submit') !== null) {

        document.getElementById('submit').onclick = function (e) {

            if (e.target.form.checkValidity()) {
                e.preventDefault()
                if (document.getElementsByClassName("newquantity")[0] !== undefined && document.getElementsByClassName("quantity")[0] !== undefined) {
                    var newval = Number.parseInt(document.getElementsByClassName("newquantity")[0].value)
                    var val = Number.parseInt(document.getElementsByClassName("quantity")[0].value)
                    var limit = Number.parseInt(document.getElementsByClassName("quantityLimit")[0].value)

                    if (newval > val) {
                        Push.create("خطأ في الكمية", {
                            body: "        الكمية أكبر من الكمية الموجودة في المخزن",
                            icon: 'images/cancel.png',
                            timeout: 5000,
                            onClose: function () {
                                end()
                            }
                        })
                        if ((val) <= limit) {
                            Push.create("  خطأ في المخزن", {
                                body: "        المنتوج لم يعد موجود كفايتا في المخزن",
                                timeout: 0,
                                icon: 'images/cancel.png',
                                onClose: function () {
                                    end()
                                }
                            });
                        }
                    }
                    else {
                        if ((val - newval) <= limit) {
                            Push.create("  خطأ في المخزن", {
                                body: "        المنتوج لم يعد موجود كفايتا في المخزن",
                                timeout: 0,
                                icon: 'images/cancel.png',
                                onClose: function () {
                                    end()
                                }
                            });
                        }
                        var data = {};
                        var inputs = [].slice.call(e.target.form.getElementsByTagName('input'));
                        var selects = [].slice.call(e.target.form.getElementsByTagName('select'))
                        inputs.forEach(input => {
                            data[input.name] = input.value;
                        });
                        selects.forEach(select => {
                            data[select.name] = select.value;
                        });
                        var ajax;
                        console.log("data track ", data)
                        if (window.XMLHttpRequest) {
                            ajax = new XMLHttpRequest()
                        } else {
                            ajax = new ActiveXObject("Microsoft.XMLHTTP")
                        }
                        start()
                        ajax.onload = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                Push.create("           تسجيل", {
                                    body: "           تم التسجيل بنجاح ",
                                    icon: 'images/checked.png',
                                    timeout: 4000,
                                    onClose: function () {
                                        end()
                                    }
                                });
                                document.getElementById('content').innerHTML = this.responseText
                                action()
                            } else {
                                Push.create("           تسجيل", {
                                    body: "           خطأ في التسجيل ، المرجو إعادة المحاولة  ",
                                    icon: 'images/cancel.png',
                                    timeout: 4000,
                                    onClose: function () {
                                        end()
                                    }
                                });
                            }

                        }
                        ajax.open('POST', '/test2', true)
                        ajax.setRequestHeader("Content-Type", "application/json")
                        ajax.send(JSON.stringify(data));
                    }

                }
                else {
                    var data = {};
                    var inputs = [].slice.call(e.target.form.getElementsByTagName('input'));
                    var selects = [].slice.call(e.target.form.getElementsByTagName('select'))
                    inputs.forEach(input => {
                        data[input.name] = input.value;
                    });
                    selects.forEach(select => {
                        data[select.name] = select.value;
                    });
                    var ajax;

                    if (window.XMLHttpRequest) {
                        ajax = new XMLHttpRequest()
                    } else {
                        ajax = new ActiveXObject("Microsoft.XMLHTTP")
                    }
                    start()
                    ajax.onload = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            Push.create("           تسجيل", {
                                body: "           تم التسجيل بنجاح ",
                                icon: 'images/checked.png',
                                timeout: 4000,
                                onClose: function () {
                                    end()
                                }
                            });
                            document.getElementById('content').innerHTML = this.responseText
                            action()
                        } else {
                            if (this.status === 417) {
                                Push.create("           تسجيل", {
                                    body: "           خطأ في dfhsh  ",
                                    icon: 'images/cancel.png',
                                    timeout: 4000,
                                    onClose: function () {
                                        end()
                                    }
                                });
                            }
                            else
                                Push.create("           تسجيل", {
                                    body: "           خطأ في التسجيل ، المرجو إعادة المحاولة  ",
                                    icon: 'images/cancel.png',
                                    timeout: 4000,
                                    onClose: function () {
                                        end()
                                    }
                                });
                        }

                    }
                    ajax.open('POST', '/test2', true)
                    ajax.setRequestHeader("Content-Type", "application/json")
                    ajax.send(JSON.stringify(data));
                }
            }
        }
    }
    if (document.getElementById('submitVaccination') !== null) {

        document.getElementById('submitVaccination').onclick = function (e) {
            e.preventDefault()
            var value = document.getElementById('id').value
            var data = {
                "id": value,
                "hidden": [],
                "date": [],
                "checkbox": []
            };
            var inputs = [].slice.call(e.target.form.getElementsByTagName('input'));

            inputs.forEach(input => {
                if (input.type === "hidden" && input.name !== 'id' )
                    data[input.type].push(input.value);
                if (input.type === "date")
                    data[input.type].push(input.value);
                if (input.type === "checkbox") {
                    if (input.checked)
                        data[input.type].push("yes");
                    else
                        data[input.type].push("no");
                }
            });
            console.log(data)
            var flag = false
            for (var i = 0; i < 10; i++) {
                if ((data["date"][i] === "" && data["checkbox"][i] === "yes") || (data["date"][i] !== "" && data["checkbox"][i] === "no")) {
                    Push.create("           erroe date", {
                        body: "           تم التسجيل بنجاح ",
                        icon: 'images/cancel.png',
                        timeout: 4000,
                        onClose: function () {
                            end()
                        }
                    });
                    flag = true
                    break
                }

            }
            if (flag) {
                console.log('problem')
            } else {
                var ajax;

                if (window.XMLHttpRequest) {
                    ajax = new XMLHttpRequest()
                } else {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP")
                }
                start()
                ajax.onload = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        Push.create("           تسجيل", {
                            body: "           تم التسجيل بنجاح ",
                            icon: 'images/checked.png',
                            timeout: 4000,
                            onClose: function () {
                                end()
                            }
                        });
                        document.getElementById('content').innerHTML = this.responseText
                        action()
                    } else {
                        console.log(this.status)
                        if (this.status === 417) {
                            Push.create("           تسجيل", {
                                body: "           خطأ في dfhsh  ",
                                icon: 'images/cancel.png',
                                timeout: 4000,
                                onClose: function () {
                                    end()
                                }
                            });
                        }
                        else
                            Push.create("           تسجيل", {
                                body: "           خطأ في التسجيل ، المرجو إعادة المحاولة  ",
                                icon: 'images/cancel.png',
                                timeout: 4000,
                                onClose: function () {
                                    end()
                                }
                            });
                    }

                }
                ajax.open('POST', '/enfant/addVaccination', true)
                ajax.setRequestHeader("Content-Type", "application/json")
                ajax.send(JSON.stringify(data));
            }
        }
    }
    if (document.getElementById('search') !== null) {

        document.getElementById('search').onclick = function (e) {
            e.preventDefault()
            var data = {};
            var inputs = [].slice.call(document.getElementsByTagName('input'));
            var selects = [].slice.call(document.getElementsByTagName('select'))
            inputs.forEach(input => {
                data[input.name] = input.value;
            });
            selects.forEach(select => {
                data[select.name] = select.value;
            });
            console.log("data = ", data)
            var ajax;

            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }
            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById('content').innerHTML = this.responseText
                    action()
                } else {

                }
            }
            ajax.open('POST', '/timeTravel', true)
            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(JSON.stringify(data));
        }
    }
    if (document.getElementById('edit') !== null) {
        document.getElementById('edit').onclick = function (e) {
            if (e.target.form.checkValidity()) {
                e.preventDefault()

                var data = {};
                var inputs = [].slice.call(document.getElementsByTagName('input'));
                var selects = [].slice.call(document.getElementsByTagName('select'))
                inputs.forEach(input => {
                    data[input.name] = input.value;
                });
                selects.forEach(select => {
                    data[select.name] = select.value;
                });
                console.log(data)
                var ajax;
                if (window.XMLHttpRequest) {
                    ajax = new XMLHttpRequest()
                } else {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP")
                }
                start()
                ajax.onload = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        Push.create("           تعديل", {
                            body: "           تم التعديل بنجاح  ",
                            icon: 'images/checked.png',
                            timeout: 2000,
                            onClose: function () {
                                end()
                            }
                        });
                        document.getElementById('content').innerHTML = this.responseText
                        action()
                    } else {
                        Push.create("           تعديل", {
                            body: "           خطأ في عملية التعديل ، المرجو إعادة المحاولة ",
                            icon: 'images/cancel.png',
                            timeout: 2000,
                            onClose: function () {
                                end()
                            }
                        });

                    }
                }
                ajax.open('POST', '/update', true)
                ajax.setRequestHeader("Content-Type", "application/json")
                ajax.send(JSON.stringify(data));
            }
        }
    }
    if (document.getElementById('chamberId') !== null) {
        document.getElementById('chamberId').onchange = (e) => {
            var name = document.getElementById('chamberId').options[document.getElementById('chamberId').selectedIndex].value
            var ajax;
            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }
            var id = JSON.stringify({
                "mod": "equipment",
                "id": name
            })
            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var obj = JSON.parse(this.responseText)
                    document.getElementById('name').innerHTML = ""
                    for (var i = 0; i < obj.names.length; i++) {
                        var option = document.createElement('option')
                        var val = document.createTextNode(obj.names[i].name)
                        option.appendChild(val)
                        document.getElementById('name').appendChild(option)
                    }
                    action()
                } else {

                }
            }
            ajax.open('POST', '/findData', true)
            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(id)
        }
    }
    if (document.getElementById('employeeList') !== null) {

        document.getElementById('employeeList').onchange = function (e) {
            e.preventDefault()
            var data = {};
            var value = document.getElementById('employeeList').options[document.getElementById('employeeList').selectedIndex].value
            data["mod"] = "employee"
            data["name"] = value
            var ajax;

            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }
            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById('content').innerHTML = this.responseText
                    action()
                } else {

                }
            }
            ajax.open('POST', '/timeTravel', true)
            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(JSON.stringify(data));
        }
    }
    if (document.getElementById('type1') !== null) {
        document.getElementById('type1').onchange = (e) => {
            var value = document.getElementById('type1').options[document.getElementById('type1').selectedIndex].value
            var ajax;
            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }
            var data = JSON.stringify({
                "type": 'type1',
                "data": value
            })
            console.log(data)
            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var obj = JSON.parse(this.responseText)
                    var names = obj.names
                    var unit = obj.unit
                    var genres = obj.genre
                    var obj_id = obj.productID
                    console.log("genre ", obj.genre)
                    var quantity = obj.quantity
                    console.log(obj)
                    document.getElementById('names').innerHTML = ""
                    for (var i = 0; i < names.length; i++) {
                        var option = document.createElement('option')
                        var val = document.createTextNode(names[i])
                        option.appendChild(val)
                        document.getElementById('names').appendChild(option)
                    }
                    document.getElementById('unit').innerHTML = ""
                    for (var i = 0; i < unit.length; i++) {
                        var option = document.createElement('option')
                        var val = document.createTextNode(unit[i])
                        option.appendChild(val)
                        document.getElementById('unit').appendChild(option)
                    }
                    console.log("avant genre", genres)
                    if(document.getElementById('genre') !== null) {
                        if (document.getElementById('genre').tagName === "INPUT") {
                            document.getElementById('genre').value = genres
                        }
                        else{
                            console.log("option else")
                            document.getElementById('genre').innerHTML = ""
                            var option = document.createElement('option')
                            var val = document.createTextNode(genres)
                            option.appendChild(val)
                            document.getElementById('genre').appendChild(option)
                        }
                    }
                    if(document.getElementById('quantity') !== null)
                        document.getElementById('quantity').value = quantity
                    if(document.getElementById('productID') !== null)
                    document.getElementById('productID').value = obj_id
                    action()
                } else {

                }
            }
            ajax.open('POST', '/findData', true)
            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(data)
        }
    }
    if (document.getElementById('names') !== null) {
        document.getElementById('names').onchange = (e) => {
            var value = document.getElementById('names').options[document.getElementById('names').selectedIndex].value
            var type1 = document.getElementById('type1').options[document.getElementById('type1').selectedIndex].value
            var ajax;
            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }
            var data = JSON.stringify({
                "type": 'name',
                "type1": type1,
                "data": value
            })
            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var obj = JSON.parse(this.responseText)
                    var unit = obj.unit
                    var genres = obj.genres
                    var quantity = obj.quantity
                    var obj_id = obj.productID
                    document.getElementById('unit').innerHTML = ""
                    for (var i = 0; i < unit.length; i++) {
                        var option = document.createElement('option')
                        var val = document.createTextNode(unit[i])
                        option.appendChild(val)
                        document.getElementById('unit').appendChild(option)
                    }
                    if(document.getElementById('genre') !== null) {
                        document.getElementById('genre').innerHTML = ""
                        for (var i = 0; i < genres.length; i++) {
                            var option = document.createElement('option')
                            var val = document.createTextNode(genres[i])
                            option.appendChild(val)
                            document.getElementById('genre').appendChild(option)
                        }
                    }
                    document.getElementById('quantity').value = quantity
                    document.getElementById('productID').value = obj_id
                    action()
                } else {

                }
            }
            ajax.open('POST', '/findData', true)
            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(data)
        }
    }
    if (document.getElementById('genre') !== null) {
        document.getElementById('genre').onchange = (e) => {
            var value = document.getElementById('genre').options[document.getElementById('genre').selectedIndex].value
            var type1 = document.getElementById('type1').options[document.getElementById('type1').selectedIndex].value
            var unit = document.getElementById('unit').options[document.getElementById('unit').selectedIndex].value
            var name = document.getElementById('names').options[document.getElementById('names').selectedIndex].value
            var ajax;
            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }
            var data = JSON.stringify({
                "type": 'genre',
                "data": value,
                "name": name,
                "type1": type1,
                "unit": unit
            })
            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var obj = JSON.parse(this.responseText)
                    var quantity = obj.quantity
                    document.getElementById('quantity').value = quantity
                    action()
                } else {

                }
            }
            ajax.open('POST', '/findData', true)
            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(data)
        }
    }
    if (document.getElementsByClassName("salleNb").length !== 0) {
        if (document.getElementsByClassName("salleNb")[0].value === "NaN") {
            document.getElementsByClassName("newSalle")[0].disabled = false
            //document.getElementsByClassName("salleNb")[0].disabled = true
        }
        else {
            document.getElementsByClassName("newSalle")[0].disabled = true
        }
        document.getElementsByClassName("salleNb")[0].onclick = (e) => {

            if (document.getElementsByClassName("salleNb")[0].value === "NaN") {
                document.getElementsByClassName("newSalle")[0].disabled = false
                //document.getElementsByClassName("salleNb")[0].disabled = true
            }
            else {
                document.getElementsByClassName("newSalle")[0].disabled = true
            }


        }
    }
    if (document.getElementById("addUser") !== null) {
        document.getElementById("addUser").onclick = (e) => {
            if (e.target.form.checkValidity()) {
                e.preventDefault()

                var data = {}
                var inputs = [].slice.call(e.target.form.getElementsByTagName('input'))
                var acces = []
                inputs.forEach(input => {
                    if (input.name === "acces") {
                        if (input.checked == true)
                            acces.push(input.value)
                    }
                    else
                        data[input.name] = input.value;
                });
                if (acces.length === 0) {
                    Push.create("           المهام", {
                        body: "           المرجوا إختيار المهام ",
                        icon: '/images/cancel.png',
                        timeout: 4000,
                        onClose: function () {
                            end()
                        }
                    });
                    action()
                } else {
                    data['access'] = acces
                    var ajax;

                    if (window.XMLHttpRequest) {
                        ajax = new XMLHttpRequest()
                    } else {
                        ajax = new ActiveXObject("Microsoft.XMLHTTP")
                    }
                    start()
                    ajax.onload = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            Push.create("تمت العملية بنجاح", {
                                body: "",
                                icon: '/images/checked.png',
                                timeout: 4000,
                                onClose: function () {
                                    end()
                                }
                            });
                            document.getElementById('content').innerHTML = this.responseText
                            action()
                        } else {
                            Push.create("          هذا المستخدم موجود", {
                                body: "          المرجو تغيير اسم المستخدم",
                                icon: '/images/cancel.png',
                                timeout: 4000,
                                onClose: function () {
                                    end()
                                }
                            });
                        }
                    }
                    ajax.open('POST', '/users', true)
                    ajax.setRequestHeader("Content-Type", "application/json")
                    ajax.send(JSON.stringify(data));
                }

            }
        }
    }
    if (document.getElementById("info_user_out") !== null) {
        document.getElementById("info_user_out").onclick = (e) => {
            var that = this;
            var ajax;
            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }

            ajax.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    setCookie("user", '', "", -1)
                    window.location.href = '/'
                } else {
                    window.location.href = '/'
                }
            }
            ajax.open('delete', '/users/token', true)
            ajax.send()
        }
    }
    if (document.getElementById('info_user_profile') !== null) {
        document.getElementById('info_user_profile').onclick = (e) => {
            var ajax;
            if (window.XMLHttpRequest) {
                ajax = new XMLHttpRequest()
            } else {
                ajax = new ActiveXObject("Microsoft.XMLHTTP")
            }

            ajax.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    window.location = this.responseText
                } else {

                }
            }
            ajax.open('GET', '/users/redirect', true)
            ajax.send()
        }
    }
    if (document.getElementById("selectMonths") !== null && document.getElementById("selectYear") !== null
        && document.getElementById("selectDays") !== null) {

        document.getElementById("selectMonths").onchange = (e) => {
            change()
        }
        document.getElementById("selectYear").onchange = (e) => {
            change()
        }
    }
}
function change() {
    var month = document.getElementById("selectMonths").selectedIndex
    var year = document.getElementById("selectYear").value
    if (month !== 0) {
        document.getElementById('selectDays').innerHTML = ""
        var option = document.createElement('option')
        var val = document.createTextNode("NaN")
        option.appendChild(val)
        document.getElementById('selectDays').appendChild(option)
        for (var i = 0; i < daysInMonth(month, year); i++) {
            var option = document.createElement('option')
            var val = document.createTextNode(i + 1)
            option.appendChild(val)
            document.getElementById('selectDays').appendChild(option)
        }
    } else {
        document.getElementById('selectDays').innerHTML = ""
        var option = document.createElement('option')
        var val = document.createTextNode("NaN")
        option.appendChild(val)
        document.getElementById('selectDays').appendChild(option)
    }
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
var bool = false
var div
function add() {
    var nb = document.getElementsByClassName("nb")[0].value
    console.log("nb = ", nb, bool)
    if (!bool) {
        div = document.getElementsByClassName("addDevice")[0].innerHTML
        bool = true
    }
    if (nb != undefined && nb != 0) {

        var addElem=""
        for (var i = 1; i <= nb; i++) {
            addElem += div
            //document.getElementsByClassName("addDevice")[0].innerHTML += div
        }
        document.getElementsByClassName("addDevice")[0].innerHTML += addElem
        bool = true;
    }

}
function menuslid() {


    if (!test) {
        document.getElementById('rightSide').style.height = window.innerHeight + 'px';
        document.getElementById('rightSide').style.width = (window.innerWidth ) + 'px';
        document.getElementById('content').style.height = (window.innerHeight - 54) + 'px';
        document.getElementById('content').style.width = (window.innerWidth ) + 'px';
        // if (document.getElementById('table1') != null) {
        //     document.getElementById('table1').style.width = (window.innerWidth ) + 'px';
        // }
        // if (document.getElementById('table') != null) {
        //     document.getElementById('table').style.width = (window.innerWidth ) + 'px';
        // }
        document.getElementById("menu").getElementsByTagName("img")[0].style.transform = "rotate(90deg)"

        document.getElementById("dashboard").style.width = 0;
        document.getElementById("accordion").style.display = "none";
        document.getElementById("title").style.display = "none";

        test = true;
    }
    else {
        setSize()
        document.getElementById("menu").getElementsByTagName("img")[0].style.transform = "rotate(0deg)"
        document.getElementById("dashboard").style.width = "230px";
        document.getElementById("accordion").style.display = "";
        document.getElementById("title").style.display = "";
        // if (document.getElementById('table1') != null) {
        //     document.getElementById('table1').style.width = (window.innerWidth - 230) + 'px';
        // }
        // if (document.getElementById('table') != null) {
        //     document.getElementById('table').style.width = (window.innerWidth - 230) + 'px';
        // }
        test = false;
    }
}
function edit(id) {
    var div = (id.parentNode.parentNode.parentNode).getElementsByTagName("td")
    var arr = div[0].innerHTML
    var productID = div[1].innerHTML
    var mod = document.getElementsByTagName("input")[0].value
    var fich = document.getElementsByTagName("input")[1].value
    var genre = document.getElementsByTagName("input")[2].value

    var data = JSON.stringify({"id": arr, "mod": mod, "fich": fich,"genre" : genre,"productID": productID})
    var ajax;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest()
    } else {
        ajax = new ActiveXObject("Microsoft.XMLHTTP")
    }
    ajax.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('content').innerHTML = this.responseText
            action()
        }
    }
    ajax.open('POST', `/edit`, true)
    ajax.setRequestHeader("Content-Type", "application/json")
    ajax.send(data);
}
function sup(id) {
    var conf = confirm("هل أنت متأكد من أنك تريد حذفها")

    if (conf) {
        var mod = document.getElementsByTagName("input")[0].value
        var fich = document.getElementsByTagName("input")[1].value
        var type
        if(document.getElementById("type") !== null)
            type = document.getElementById("type").value
        var div = (id.parentNode.parentNode.parentNode).getElementsByTagName("td")
        var object
        if (mod === "user")
            objId = div[1].innerHTML
        else
            objId = div[0].innerHTML

        console.log(objId,mod)

        var data = JSON.stringify({"id": objId, "mod": mod, "fich": fich,"type": type})
        console.log(data)
        var ajax;
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest()
        } else {
            ajax = new ActiveXObject("Microsoft.XMLHTTP")
        }
        ajax.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById('content').innerHTML = this.responseText
                action()
            }
        }
        ajax.open('DELETE', `/delete`, true)
        ajax.setRequestHeader("Content-Type", "application/json")
        ajax.send(data);
    }
}
function printe(divName) {
    var content
    if (divName !== 'id')
        content = document.getElementsByClassName("table")[0].innerHTML
    else
        content = document.getElementById("panel").innerHTML
    var body = document.body.innerHTML
    var header = document.getElementById("printContainer").innerHTML
    // var html, link, blob, url, css;
    document.body.innerHTML = header + content
    window.print()
    document.body.innerHTML = body
}
function docx(e){
    e.preventDefault()
    // var selects = [].slice.call(document.getElementsByTagName('select'))
    // var data = {}
    // var mod = document.getElementById('mod').value
    // selects.forEach(select => {
    //     if(select.name === 'months')
    //         data[select.name] = select.selectedIndex
    //     else
    //     data[select.name] = select.value
    // })
    // data['mod'] = mod
    // console.log(data)
    // data = JSON.stringify(data)
    // if (window.XMLHttpRequest) {
    //     ajax = new XMLHttpRequest()
    // } else {
    //     ajax = new ActiveXObject("Microsoft.XMLHTTP")
    // }
    // ajax.onload = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         // document.getElementById('content').innerHTML = this.responseText
    //         // action()
    //     }
    // }
    // ajax.open('POST', `/docx`, true)
    // ajax.setRequestHeader("Content-Type", "application/json")
    // ajax.send(data);
}
function vaccination(id) {
    var div = id.parentNode.parentNode

    var i = div.getElementsByTagName("td")[0].innerHTML;
    var ajax;
    var data = JSON.stringify({"id": i})
    console.log(data)
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest()
    } else {
        ajax = new ActiveXObject("Microsoft.XMLHTTP")
    }
    ajax.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('content').innerHTML = this.responseText
            action()
        }
    }
    ajax.open('POST', `/enfant/vaccination`, true)
    ajax.setRequestHeader("Content-Type", "application/json")
    ajax.send(data);
}
function start() {
    document.getElementsByClassName("loding")[0].style.animation = "spin .7s infinite linear"
}
function end() {
    document.getElementsByClassName("loding")[0].style.animation = ""
}
function printJugment(id) {
    var div = id.parentNode.parentNode.parentNode

    id = div.getElementsByTagName("td")[0].innerHTML;
    var ajax;
    var data = JSON.stringify({"id": id})
    console.log(data)
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest()
    } else {
        ajax = new ActiveXObject("Microsoft.XMLHTTP")
    }
    ajax.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var body = document.body.innerHTML
            document.body.innerHTML = this.responseText
            window.print()
            document.body.innerHTML = body
            action()
        }
    }
    ajax.open('POST', `/enfant/jugement`, true)
    ajax.setRequestHeader("Content-Type", "application/json")
    ajax.send(data);
}

function msgSubmit(input) {
    //  console.log("value", input.value.length)
    // if(input.value.length == 0 ){
    //     input.setCustomValidity('المرجوا ملء هاته الخانة')
    // }
}