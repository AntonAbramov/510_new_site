document.body.onload = function () {

	var editMode = undefined;
	var btn = document.querySelectorAll('.add-task')[0];
	var input = document.getElementsByName('fieldValue')[0];
	var ul = document.createElement('ul');	
	ul.className = ('list-container');
	document.querySelectorAll('.wrapper')[0].appendChild(ul);

	function DataItem (val, date) {
		this.todo = val ;
		this.date = date;
	}

	this.Controller = function () {
		this.items = [];

		this.addItem = function (val) {
			var a = new DataItem(val , new Date().toGMTString());
			this.items.push(a);
			return a;
		}

		this.removeItem = function (obj) {
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i] == obj) {
					this.items.splice(i, 1);
				}
			}
		}

		this.updateItem = function (item, newVal) {
			
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i] == item) {
					 this.items[i].todo = newVal;
					 this.items[i].date = new Date().toGMTString();
					 return this.items[i];
				}
			}

			
		}

		this.clearValue = function (field) {
			field.value = "";
		}
	}


	function View () {
		var that = this;
        this.controller = new Controller();

		//Handler on add todo
		btn.addEventListener('click', function () {
			var inputVal = input.value;
			// button handler
			if(inputVal.length) {
				if (!editMode) {
					var item = that.controller.addItem(inputVal);
					var li = document.createElement("li");
					li.innerHTML = "<span class='val'>"+item.todo+"</span><date>"+item.date+"</date><button class='del'>Remove Item</button>";
					ul.appendChild(li);
					
					//Eddite item
					li.querySelector('.val').addEventListener('click', function(){
						editMode = true;
						input.value = item.todo;
						that.controller.currentEditItem = item;
						that.controller.currentListElement = li;
						
					});

					//Remove item
					li.querySelector('.del').addEventListener('click', function(){
						that.controller.removeItem(item);
						li.remove();
					});
				}
				else {
					var updatedItem = that.controller.updateItem(that.controller.currentEditItem, inputVal);
					console.log(updatedItem);
					that.controller.currentListElement.innerHTML = "<span class='val'>"+updatedItem.todo+"</span><date>"+updatedItem.date+"</date><button class='del'>Remove Item</button>";
					editMode = false;

				}

			}
			else {
				console.log("Error please fill the input");
			}
			
			that.controller.clearValue(input);
		});

	}
	var view = new View();
}