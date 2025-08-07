(function () {
    window.$viewService.createComponent(
      'dynamicSelector',
      {
        props: {
          dataConfig: {
            type: Object,
            required: true
          }
        },
        components: {
        },
        beforeDestroy: function beforeDestroy() {
          if(this.app){
            this.app.destroySessionObject(this.hypercubeId);
            this.app.field(this.object.dimension).clear();
          }
        },
        data () {
          return {
            instances: {},
            connection: {},
            valuesNames: [],
            hypercubeId: undefined,
            actualSelection: undefined,
            hasForcedSelection: false
          }
        },
        methods: {
          loadConnection () {
            let _self = this
            return new Promise((resolve, reject) => {
              try {
                window.$viewService.getConnection(_self.dataConfig.connection).then(connection => {
                  if (connection.type === 'qlikConnection') {
                    _self.connection = connection
                    resolve()
                  } else {
                    _self.loading = false
                    _self.renderError = true
                    console.error(`Invalid connection type, expected: 'qlikConnection' but found '${connection.type}'`)
                    resolve()
                  }
                })
              } catch (err) {
                console.error(err)
                reject()
              }
            })
          },
          

          cubeDefinition: function (fieldName) {
            return {
              qDef: {
                qFieldDefs: [fieldName]
              },
              qAutoSortByState: {
                qDisplayNumberOfRows: 1
              },
              qShowAlternatives: true,
              qInitialDataFetch: [{
                qHeight: 10000,
                qWidth: 1,
                qTop: 0
              }]
            };
          },

          getValues(){
            var _this = this;
            _this.app.createList(_this.cubeDefinition(this.object.dimension), function (reply) {
              _this.hypercubeId = reply.qInfo.qId 
              if (reply.qListObject.qDataPages.length > 0) {
                let values = reply.qListObject.qDataPages[0].qMatrix

                let valuesNames = []
                let actualSelection = undefined
                for(let i=0;i<values.length;i++){
                    if(!_this.object.hideUnavailable || values[i][0].qState !== 'X'){
                      valuesNames.push(values[i][0].qText)
                    }
                    if(values[i][0].qState === 'S'){
                      actualSelection = values[i][0].qText
                      _this.resizeDropdownSeguimiento()
                    }
                }    
                
                if(_this.object.dimension === '[#SELECTOR_TIEMPO]' || _this.object.dimension === '#SELECTOR_TIEMPO' || _this.object.dimension === '#SEM_ACT'){
                  const orden =  _this.object.dimension === '#SEM_ACT' ? ['Semana anterior', 'Semana actual'] : ['Semana Actual', 'Semana Anterior', 'Mes Actual', 'Año en curso', 'Últ. 3 meses', 'Últ. 6 meses', 'Últ. 12 meses', 'Año anterior']
                 const valuesSorted = []

                  for (let i of orden) {
                    if (valuesNames.includes(i)) {
                      valuesSorted.push(i)
                    }
                  }

              if (_this.object.id === 'tiempoAcciones') {
                const adicionales = ['Últ. 4 semanas', 'Total días acción']
                for (let extra of adicionales) {
                  if (valuesNames.includes(extra) && !valuesSorted.includes(extra)) {
                    valuesSorted.push(extra)
                  }
                }
              }

              _this.valuesNames = valuesSorted
  
                } else{
                  _this.valuesNames = valuesNames.sort().reverse()
                }

                _this.actualSelection = actualSelection
              }

              
              
            }); 

            _this.resizeDropdownSeguimiento()
                 
          },

          decideChangeFunction(){

            if(this.object.onchange !== ''){
              eval(this.object.onchange)
            }else{
              if(this.object.title == "Indicador"){
                let e = document.querySelector('#'+this.object.id)
                
                let optionSelected = e.options[e.selectedIndex].value
                window.setFilterByValue(this.object.dimension, optionSelected)
                window.actualQlik.resize()
                //window.changeOpMargen()
              }
              else if(this.object.title == "Datos"){
                window.changeRatio()
              }
              else if(this.object.title == "Tiempo"){
                window.changeTiempo()
              }else{
                let e = document.querySelector('#'+this.object.id)
                
                let optionSelected = e.options[e.selectedIndex].value
                window.app.field(this.object.dimension).clear()
                
                window.setFilterByValue(this.object.dimension, optionSelected)
                //window.actualQlik.resize()
              }
            }

            this.resizeDropdownSeguimiento()
            
          },

          resizeDropdownSeguimiento: function(){
            if(this.object.objectClass.includes('select-seguimiento')){
              window.waitForElement('#'+this.object.id + ' option', () => {

                let spanWidth = document.querySelectorAll('#dynamicsel-'+this.object.id+' .span-width')[0]
                
                let width = 0
  
                if(spanWidth){
                  spanWidth.classList.remove('d-none')
                  spanWidth.innerText = this.actualSelection
                  width = spanWidth.getBoundingClientRect().width

                  Array.from(document.querySelectorAll('#dynamicsel-'+this.object.id+' .span-width')).map(e => e.classList.add('d-none'))
                  //spanWidth.classList.add('d-none')
                  width = width + 40
  
                  document.querySelectorAll('#'+this.object.id)[0].style.flex = '0 0 ' + width.toString() + 'px'
                  document.querySelectorAll('#'+this.object.id)[0].style.maxWidth = width.toString() + 'px'
  
                }
                });
            }
            
              
          }
         
        },
        computed: {
          app() {
            return window.$viewInstanceVue.$store.getters['getQlikApp'](this.connection)
          },
          object () {
            return {
              'type': this.dataConfig.type,
              'objectClass': this.dataConfig.objectClass || '',
              'title': this.dataConfig.title,
              'dimension': this.dataConfig.dimension,
              'id': this.dataConfig.id,
              'showDropdownArrow': this.dataConfig.showDropdownArrow || false,
              'onchange': this.dataConfig.onchange ||'',
              'addDisabledOption': this.dataConfig.addDisabledOption || false,
              'hideUnavailable': this.dataConfig.hideUnavailable || false
            }
          }
        },
        mounted: function() {
          const _self = this
          _self.loadConnection()
          _self.resizeDropdownSeguimiento()
        },
        watch: {
          app(newValue) {
            if(newValue){
              this.getValues()
            }
          }
        },
        
        template: `
        <div class='dynamic-selector' :class='object.objectClass' :id="'dynamicsel-'+object.id">
          <div class="row mx-0">
            <span id='selectorTitle' class='title'>{{this.object.title}}</span>
            <select class="pr-2" :id="object.id" v-on:change='decideChangeFunction()'>
              <option :checked="item === actualSelection" v-for="(item,index) in valuesNames" :value="item">{{item}}</option>
              <option v-if="object.addDisabledOption" class="disabled-option" disabled></option>
            </select>
            <i v-if="object.showDropdownArrow" aria-hidden="true" class="fa fa-chevron-down p-0 m-0"></i>
            <span class="d-none span-width">{{actualSelection}}</span>
          </div>
        </div>
        `
      },
      'application/components/dynamicSelector/style_dynamicSelector.css'
    )
  })()
  
