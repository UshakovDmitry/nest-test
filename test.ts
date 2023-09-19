<input type="checkbox" id="switch" /><label for="switch">Toggle</label>


input[type=checkbox]{
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 200px;
  height: 100px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 90px;
  height: 90px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

input:checked + label {
  background: #bada55;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 130px;
}

// centering
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}












/////////////////////////

















<label class="toggle">
  <input class="toggle-checkbox" type="checkbox">
  <div class="toggle-switch"></div>
  <span class="toggle-label">Wi-fi</span>
</label>

<hr>

<label class="toggle">
  <input class="toggle-checkbox" type="checkbox" checked>
  <div class="toggle-switch"></div>
  <span class="toggle-label">Bluetooth</span>
</label>





*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, ".SFNSText-Regular", "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
}

.toggle {
  cursor: pointer;
  display: inline-block;
}

.toggle-switch {
  display: inline-block;
  background: #ccc;
  border-radius: 16px;
  width: 58px;
  height: 32px;
  position: relative;
  vertical-align: middle;
  transition: background 0.25s;
}
.toggle-switch:before, .toggle-switch:after {
  content: "";
}
.toggle-switch:before {
  display: block;
  background: linear-gradient(to bottom, #fff 0%, #eee 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
  width: 24px;
  height: 24px;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: left 0.25s;
}
.toggle:hover .toggle-switch:before {
  background: linear-gradient(to bottom, #fff 0%, #fff 100%);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
}
.toggle-checkbox:checked + .toggle-switch {
  background: #56c080;
}
.toggle-checkbox:checked + .toggle-switch:before {
  left: 30px;
}

.toggle-checkbox {
  position: absolute;
  visibility: hidden;
}

.toggle-label {
  margin-left: 5px;
  position: relative;
  top: 2px;
}

