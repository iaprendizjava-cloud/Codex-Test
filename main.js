"use strict";


window.wuilderShowError = false;

window.notUseLicense = true;

console.log('v06.08.2025')

window.isIE = function () {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    return true;
  }
  return false;
}

window.isIEAlert = function () {
  if (window.isIE()) {
    alert('Este navegador no es compatible con la aplicación Mis Ventas. Se recomienda acceder a través de Google Chrome o Microsoft Edge para una experiencia de usuario satisfactoria.')
  }
}

window.deleteQlikTicket = function () {
  let href = window.location.href
  let finalUrl = ''

  if (href.includes('qlikTicket')) {
    href = href.split('?qlikTicket=')
    finalUrl = href[0]
    href = href[1].split('#')
    finalUrl = finalUrl + '#' + href[1]
    window.location.href = finalUrl
  }
  else {
    if (href.includes('#undefined')) {
      finalUrl = href.replace('#undefined', '#/index')
      window.location.href = finalUrl
    }
  }
}

window.redirectNrt = function () {
  if (window.location.href.includes('#/ventasdiarias') || window.location.href.includes('#/retos') || window.location.href.includes('#/catalogocompleto')
    || window.location.href.includes('#/detalleretos') || window.location.href.includes('#/ventashistoricas') || window.location.href.includes('#/campanaAcciones')
    || window.location.href.includes('#/accionescomerciales') || window.location.href.includes('#/campanaInformes') || window.location.href.includes('#/informesoficina')) {

    if (window.location.hostname == 'qlspro.lacaixa.es') {

      let href = window.location.href

      let finalUrl = ''

      if (href.includes('qlikTicket')) {
        href = href.split('?qlikTicket=')
        finalUrl = href[0]
        href = href[1].split('#')
        finalUrl = finalUrl + '#' + href[1]
      }
      else {
        finalUrl = href
      }

      finalUrl = finalUrl.replace('qlspro.lacaixa.es', 'qlsnrt.lacaixa.es')
      let division = finalUrl.split('#/')
      finalUrl = division[0] + '#/index'

      window.location.href = finalUrl
    }
  }
}

window.apps = {}
/* CONFIG APPIDS */
const Http = new XMLHttpRequest();
const url = 'globals.json';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = function () {
  if (Http.status === 200 && Http.responseText.length) {
    const data = JSON.parse(Http.responseText)
    data.appConfig.forEach(function (app) {
      window.apps[app.name] = app.id
    })
  }
}

//Get app by location
window.getAppId = function () {

  let id = ''

  if (window.location.hash.includes('ventasdiarias')) {
    id = 'APQSFC - Venta Diaria'
  }
  else if (window.location.hash.includes('ventashistoricas')) {
    id = 'APQSFC - Venta Historica'
  }
  else if (window.location.hash.includes('catalogocompleto')) {
    id = 'APQSFC - Venta Catalogo'
  }
  else if (window.location.hash.includes('retos')) {
    id = 'APQSFC - Retos'
  }
  else if (window.location.hash.includes('acciones')) {
    id = 'APQSFC - Acciones Comerciales'
  }
  else if (window.location.hash.includes('nps')) {
    id = 'APQSFC - NPS'
  }
  else if (window.location.hash.includes('cpe')) {
    id = 'APQSFC - IEC'
  }
  else if (window.location.hash.includes('citas') | window.location.hash.includes('telefonounico')) {
    id = 'APQSFC - Omni Citas'
  }
  else if (window.location.hash.includes('otrosinformes')) {
    id = 'APQSFC - Informes Oficina'
  }
  else if (window.location.hash.includes('informes')) {
    id = 'APQSFC - Informes Comerciales'
  }
  else if (window.location.hash.includes('muro')) {
    id = 'APQSFC - Omni Muro'
  } 
  else if (window.location.hash.includes('meeter')) {
    id = 'APQSFC - Omni Meeter'
  }  
  else if (window.location.hash.includes('cuadromandonegocios')) {
    id = 'APQSFC - Negocios'
  }
  else if (window.location.hash.includes('cuadromandosegmentos')) {
    id = 'APQSFC - Segmentos'
  }
  else if (window.location.hash.includes('fichaoficina')) {
    id = 'APQSFC - Ficha Oficina'
  }

  return window.apps[id] || 'defaultapp si la necesitais'
}

//Get app by name
window.getAppIdByName = function (id) {
  return window.apps[id] || 'defaultapp si la necesitais'
}

//Get server host
window.getHost = function () {
  //Server
  // if (window.location.hostname == 'localhost') {
  //   return 'sfdev2.sdggroup.com'
  // }
  // Local
  if (window.location.hostname == 'localhost') {
    return 'localhost'
  }
  return window.location.hostname
}

//Get server port
window.getPort = function () {
  if (window.getHost() === 'sfdev2.sdggroup.com' || window.getHost() === '52.215.171.105') {
    return '443'
  }
  else if (window.getHost() === 'localhost') {
    return '4848'
  }
  return ''
}

window.getSecure = function () {
  if (window.getHost() == 'localhost') {
    return false
  }
  return true
}

//Identify adfs url
window.getPrefix = function () {
  if (window.location.pathname.includes('qlsproadfs')) {
    return 'qlsproadfs'
  } else if (window.location.pathname.includes('qlsnrtadfs')) {
    return 'qlsnrtadfs'
  } else if (window.location.pathname.includes('robot')) {
    return 'robot'
  } else if (window.location.pathname.includes('aznrt')) {
    return 'aznrt'
  } else if (window.location.pathname.includes('qlikisamnrt')) {
    return 'qlikisamnrt'
  }

  if (window.getHost() == 'localhost') {
    return '/'
  }

  return ''

}

//Set toggle to active value
window.activateToggle = function (active, desactive) {
  if (window.innerWidth < 1025) {
    if (document.getElementsByClassName(desactive)[0] && document.getElementsByClassName(desactive)[0].classList.contains('active')) {
      document.getElementsByClassName(desactive)[0].classList.remove('active')
    }
    if (document.getElementsByClassName(active)[0]) {
      document.getElementsByClassName(active)[0].classList.add('active')
    }
  }
}

//Setea los valores iniciales en #OP_IMPORTE y #TOTALES_RATIO y modifica la variable vL_Title_Importe_Operaciones
window.defineCarousel = function () {
  if (window.innerWidth < 1025) {
    window.setFilterByValue('#OP_IMPORTE', 'Operaciones')
    window.setFilterByValue('#TOTALES_RATIO', 'Total')
    if (window.app) {
      window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Operaciones totales')
    }
  }
}

//Setea los valores en los filtros #OP_MARGEN y #TOTALES_RATIO en funcion del selector en la vista de accionescomerciales
window.changeOpIm = function () {
  let e = document.querySelector('#selectOpMa')
  let optionSelected = e.options[e.selectedIndex].value

  switch (optionSelected) {
    case '1':
      window.setFilterByValue('#OP_MARGEN', 'Operaciones')
      window.setFilterByValue('#TOTALES_RATIO', 'Total')
      break;
    case '2':
      window.setFilterByValue('#OP_MARGEN', 'Operaciones')
      window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
      break;
    case '3':
      window.setFilterByValue('#OP_MARGEN', 'Margen')
      window.setFilterByValue('#TOTALES_RATIO', 'Total')
      break;
    case '4':
      window.setFilterByValue('#OP_MARGEN', 'Margen')
      window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
      break;
  }
}

//Creacion listener en botones del carrusel de ventadiarias y ventahistorica
window.listenerVentasDiarias = function () {
  if (window.innerWidth < 1025) {
    if (document.querySelectorAll('.kpi-carrousel .col-1')[0]) {
      document.querySelectorAll('.kpi-carrousel .col-1')[0].addEventListener("click", function (e) {
        window.modifyPrevious()
      });
    }
    if (document.querySelectorAll('.kpi-carrousel .col-1')[1]) {
      document.querySelectorAll('.kpi-carrousel .col-1')[1].addEventListener("click", function (e) {
        window.modifyFollowing()
      });
    }
  }
}
//Destroy listener en botones del carrusel de ventadiarias y ventahistorica
window.destroyListenerVentasDiarias = function () {
  if (window.innerWidth < 1025) {
    if (document.querySelectorAll('.kpi-carrousel .col-1')[0]) {
      document.querySelectorAll('.kpi-carrousel .col-1')[0].removeEventListener("click", function (e) {
        window.modifyPrevious()
      });
    }
    if (document.querySelectorAll('.kpi-carrousel .col-1')[1]) {
      document.querySelectorAll('.kpi-carrousel .col-1')[1].removeEventListener("click", function (e) {
        window.modifyFollowing()
      });
    }
  }
}

//Accion boton siguiente carrusel ventadiaria y ventahistorica
window.modifyFollowing = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '#OP_IMPORTE'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {

        window.app.createGenericObject({
          variableValue: {
            qStringExpression: '#TOTALES_RATIO'
          }
        }, function (reply2) {
          window.app.destroySessionObject(reply2.qInfo.qId).then(function () {
            if (reply2.variableValue) {
              if (reply.variableValue == 'Operaciones') {
                if (reply2.variableValue == 'Total') {
                  window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Operaciones por empleado')
                  }
                }
                else {
                  window.setFilterByValue('#OP_IMPORTE', 'Importe')
                  window.setFilterByValue('#TOTALES_RATIO', 'Total')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Importe total')
                  }
                }
              }
              else if (reply.variableValue == 'Importe') {
                if (reply2.variableValue == 'Total') {
                  window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Importe por empleado')
                  }
                }
                else {
                  window.setFilterByValue('#OP_IMPORTE', 'Margen')
                  window.setFilterByValue('#TOTALES_RATIO', 'Total')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Margen total')
                  }
                }
              }
              else {
                if (reply2.variableValue == 'Total') {
                  window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Margen por empleado')
                  }
                }
                else {
                  window.setFilterByValue('#OP_IMPORTE', 'Operaciones')
                  window.setFilterByValue('#TOTALES_RATIO', 'Total')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Operaciones totales')
                  }
                }
              }
            }
          })
        })
      }
    })
  })
}

//Accion boton previo carrusel ventadiaria y ventahistorica
window.modifyPrevious = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '#OP_IMPORTE'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {

        window.app.createGenericObject({
          variableValue: {
            qStringExpression: '#TOTALES_RATIO'
          }
        }, function (reply2) {
          window.app.destroySessionObject(reply2.qInfo.qId).then(function () {
            if (reply2.variableValue) {

              if (reply.variableValue == 'Operaciones') {
                if (reply2.variableValue == 'Total') {
                  window.setFilterByValue('#OP_IMPORTE', 'Margen')
                  window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Margen por empleado')
                  }
                }
                else {
                  window.setFilterByValue('#TOTALES_RATIO', 'Total')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Operaciones totales')
                  }
                }
              }
              else if (reply.variableValue == 'Margen') {
                if (reply2.variableValue == 'Total') {
                  window.setFilterByValue('#OP_IMPORTE', 'Importe')
                  window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Importe por empleado')
                  }
                }
                else {
                  window.setFilterByValue('#TOTALES_RATIO', 'Total')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Margen total')
                  }
                }
              }
              else {
                if (reply2.variableValue == 'Total') {
                  window.setFilterByValue('#OP_IMPORTE', 'Operaciones')
                  window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Operaciones por empleado')
                  }
                }
                else {
                  window.setFilterByValue('#TOTALES_RATIO', 'Total')
                  if (window.app) {
                    window.app.variable.setStringValue('vL_Title_Importe_Operaciones', 'Importe total')
                  }
                }
              }
            }
          })
        })
      }
    })
  })
}

//Creacion listenerDropdown
window.listenerDropdown = function () {
  if (window.innerWidth < 577) {
    let filters = document.querySelectorAll('.sidebar-right .filter-button')
    for (let i = 0; i < filters.length; i++) {
      filters[i].addEventListener("click", function (e) {
        window.moveDropdown()
      });
    }

    setTimeout(function () {
      if (document.querySelectorAll('.filter-territorial').length > 0) {
        document.querySelectorAll('.filter-territorial')[0].addEventListener("click", function (e) {
          window.moveDropdown()
        });
      }
    }, 1000);

  }
}
//Destruccion listenerDropdown
window.destroyListenerDropdown = function () {
  if (window.innerWidth < 577) {
    let filters = document.querySelectorAll('.sidebar-right .filter-button')
    for (let i = 0; i < filters.length; i++) {
      filters[i].removeEventListener("click", function (e) {
        window.moveDropdown()
      });
    }

    setTimeout(function () {
      if (document.querySelectorAll('.filter-territorial').length > 0) {
        document.querySelectorAll('.filter-territorial')[0].removeEventListener("click", function (e) {
          window.moveDropdown()
        });
      }
    }, 1000);
  }
}

//Recoloca el dropdown de los filtros en la posición correcta
window.moveDropdown = function () {
  setTimeout(function () {
    if (document.querySelectorAll('.lui-popover-container.ng-scope')[0]) {
      document.querySelectorAll('.lui-popover-container.ng-scope')[0].classList.add('lui-popover-container-performance')
      document.querySelectorAll('.lui-popover-container.ng-scope')[0].classList.remove('lui-popover-container')
    }
  }, 10);
}

//Accion de modificar HOY_SEMANA and OP_IMPORTE en ventadiaria y ventahistorica en la versión responsive
window.modifyToggle = function (active, desactive, filterName, value) {
  if (document.getElementsByClassName(desactive)[0].classList.contains('active')) {
    document.getElementsByClassName(desactive)[0].classList.remove('active')
  }
  document.getElementsByClassName(active)[0].classList.add('active')
  window.setFilterByValue(filterName, value)
}

//Set value to filter
window.setFilterByValue = function (filterName, value) {
  return new Promise(function (resolve) {
    if (window.app && window.app.field != undefined && filterName && value) {
      if(filterName === '#RED' || filterName === '#HOY_SEMANA' || filterName === '#OP_IMPORTE' || filterName === '#TOTALES_RATIO' || filterName === '#CANCELACIONES_VENTAS' || filterName === '#OP_MARGEN' || filterName === '#VISION_PRODUCTO' ){
        window.app.field(filterName).selectValues([value], false, true).then(function () {
          resolve();
        });
      }else{
        window.app.field(filterName).selectMatch(value, true).then(function () {
          resolve();
        });
      }
    } else {
      resolve();
    }
  });
};

//Set multiple value to filter
window.setFilterByMultipleValues = function (filterName, values) {
  return new Promise(function (resolve) {
    if (window.app) {

      if(filterName !== 'Fecha' && filterName !== 'Mes' && filterName !== 'Semana'){
        window.app.field(filterName).selectValues(values,false,true).then(()=>{
          resolve()
        })
      }else{
        window.app.field(filterName).select(values.map(e => parseInt(e)),false,true).then(() => {
          resolve()
        })
      }

    } else {
      resolve();
    }
  });
};

//Modify filter position in ventasdiarias
window.changeFilterPosition = function () {
  let e = document.getElementById('selectFilterPosition')
  let optionSelected = e.options[e.selectedIndex].value
  if (window.app && optionSelected) {
    window.app.variable.setStringValue('vL_Selector_Rank', optionSelected);
  }
}

//Modify select width according to the text
window.resizeDropdownReto = function (id) {
  let text = document.querySelectorAll('#selectReto option')[id]
  if (text) {
    text = text.innerText
    let width = text.length * 8
    if (width < 50) {
      width = 54
    }
    document.querySelectorAll('.tab-filter-oficina i')[0].style.left = width.toString() + 'px'
  }
}

//Modify select width according to the text
window.resizeDropdownRetoCustom = function (id) {
  let text = document.querySelectorAll('#selectRetoCustom option')[id]
  if (text) {
    text = text.innerText
    let width = text.length * 8
    if (width < 50) {
      width = 54
    }
    document.querySelectorAll('.tab-filter-oficina i')[0].style.left = width.toString() + 'px'
  }
}

//Set initial values to dropdown reto
window.initializeDropdownReto = function () {
  if (document.getElementById('selectReto')) {
    document.getElementById('selectReto').value = 'oficinaReto'
    window.setSelectorIndicador(1)
    window.resizeDropdownReto(0)
    window.page = 'detalleretos'
    window.actionBreadcrumbDT()
  }
}

//Set initial values to dropdown reto
window.initializeDropdownRetoCustom = function () {
  document.getElementById('selectReto').value = 'oficinaReto'
  window.setSelectorIndicador(1)
  window.resizeDropdownReto(0)
  window.page = 'detalleretos'
  window.actionBreadcrumbDT()
}

//Actions when modify dropdown reto
window.changeDropdownReto = function () {
  let e = document.getElementById('selectReto')
  let id = e.selectedIndex + 1
  window.setSelectorIndicador(id)
  window.resizeDropdownReto(e.selectedIndex)
  window.changeJerarquia()
  window.actualQlik.resize()
}

//Actions when modify dropdown reto
window.changeDropdownRetoCustom = function (index, value) {
  let e = document.getElementById('selectRetoCustom')
  // let id = e.selectedIndex + 1
  window.setSelectorIndicador(value)
  //window.resizeDropdownRetoCustom(index)
  window.changeJerarquia()
  window.actualQlik.resize()
}

window.changeDropdownCita = function () {
  if (window.innerWidth < 1024) {
    let e = document.getElementById('selectCita')
    if (e) {
      let id = e.value
      if (id == 'citaNegocio') {
        document.getElementsByClassName('tipoCita')[0].classList.add('d-none')
        document.getElementsByClassName('citaNegocio')[0].classList.remove('d-none')
      }
      else if (id == 'tipoCita') {
        document.getElementsByClassName('tipoCita')[0].classList.remove('d-none')
        document.getElementsByClassName('citaNegocio')[0].classList.add('d-none')
      }
      window.actualQlik.resize()
    }
  }
}

//Set value to variable vL_Selector_Indicador
window.setSelectorIndicador = function (value) {
  if (window.app && value) {
    if(window.location.hash.includes('detalleaportacionsegmentos')){
      window.app.variable.setStringValue('vL_Selector_KPI_Segmento', value.toString())
    }else{
      window.app.variable.setStringValue('vL_Selector_Indicador', value.toString())
    }
    
  }
}

window.changeOpMargen = function () {
  let e = document.querySelector('#op_margen')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#OP_MARGEN', optionSelected)
  window.actualQlik.resize()
}

window.cubeDefinition = function (fieldName) {
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

  window.changeTipoVenta = function () {
    let e = document.querySelector('#tipo_venta')

    let optionSelected = e.options[e.selectedIndex].value

    window.app.createList(window.cubeDefinition('#CANCELACIONES_VENTAS'), function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId);

      if (reply.qListObject.qDataPages.length > 0) {
        window.arrayCampana = []
        let elements = reply.qListObject.qDataPages[0].qMatrix

        let check = false

        for (let i = 0; i < elements.length; i++) {
          if (elements[i][0].qText == optionSelected && elements[i][0].qState != 'X') {
            check = true
            break
          }
        }

        if (check) {
          localStorage.setItem('tipoVenta', optionSelected)
          window.setFilterByValue('#CANCELACIONES_VENTAS', optionSelected)
          window.actualQlik.resize()
        }
        else {
          e.value = localStorage.getItem('tipoVenta')
        }
      }
    });
  }

window.changeVisionProducto = function () {
  if (!document.getElementsByClassName('segunda-estructura')[0]) {
    let e = document.querySelector('.segunda-estructura #vision_producto')
    let optionSelected = e.options[e.selectedIndex].value
    window.setFilterByValue('#VISION_PRODUCTO', optionSelected)
    window.actualQlik.resize()
  }
}

window.changeTotalMedia = function () {
  let e = document.querySelector('#total_media')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#TOTALES_RATIO', optionSelected)
  window.actualQlik.resize()
}


window.changeTiempoCitas = function () {
  let e = document.querySelector('#op_tiempo')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#SELECTOR_TIEMPO', optionSelected)
  localStorage.setItem("tiempoCitas", optionSelected)
  window.actualQlik.resize()
}

window.changeTiempoMuro = function () {
  let e = document.querySelector('#op_tiempo')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#SELECTOR_TIEMPO_M', optionSelected)
  localStorage.setItem("tiempoMuro", optionSelected)
  window.actualQlik.resize()
}

window.changeTiempoMeeter = function () {
  let e = document.querySelector('#op_tiempo')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#SELECTOR_TIEMPO', optionSelected)
  localStorage.setItem("tiempoMeeter", optionSelected)
  window.actualQlik.resize()
}

window.changeOp = function () {
  let e = document.getElementById('op_importe')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#OP_IMPORTE', optionSelected)
  window.actualQlik.resize()
}

window.changeVenta = function () {
  let e = document.getElementById('cancelaciones_ventas')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#CANCELACIONES_VENTAS', optionSelected)
  window.actualQlik.resize()
}

window.changeProduccion = function () {
  let e = document.getElementById('select-produccion')

  let objects = document.querySelectorAll('.objects-produccion .qlik-basic-object')
  if (objects.length > 0) {
    if (objects[e.selectedIndex].classList.contains('d-none')) {
      for (let i = 0; i < objects.length; i++) {
        if (!objects[i].classList.contains('d-none')) {
          objects[i].classList.add('d-none')
        }
      }
      objects[e.selectedIndex].classList.remove('d-none')
    }
  }

  window.actualQlik.resize()
}


window.changeEvolucionGrafico = function (selectElement) {
  const groupClass = selectElement.dataset.group;
  const wrapper = document.querySelector(`.evolucion-tab.${groupClass}`);
  if (!wrapper) return;

  const objects = wrapper.querySelectorAll('.qlik-basic-object');
  const index = selectElement.selectedIndex;

  objects.forEach((obj, i) => {
    obj.classList.toggle('d-none', i !== index);
  });

  window.actualQlik?.resize();
}


window.changeTiempo = function () {
  let e = document.getElementById('tiempo')
  if (e) {
    let optionSelected = e.options[e.selectedIndex].value
    window.setFilterByValue('#HOY_SEMANA', optionSelected)
    window.actualQlik.resize()
  }
}

window.changeTiempoHistorico = function (version) {
  let e = document.querySelectorAll('.' + version + ' #tiempoHistorico')
  if (e.length > 0) {
    e = e[0]
  }
  let optionSelected = e.options[e.selectedIndex].value
  if (optionSelected) {
    window.app.field('Fecha').clear()
  }
  window.setFilterByValue('#SELECTOR_TIEMPO', optionSelected)

  window.actualQlik.resize()
}

window.changeTiempoSelector = function (selector) {
  let e = document.querySelectorAll(selector)
  if (e.length > 0) {
    e = e[0]
  }
  let optionSelected = e.options[e.selectedIndex].value
  if (optionSelected) {
    window.app.field('Fecha').clear()
  }

  window.setFilterByValue('#SELECTOR_TIEMPO', optionSelected)

  window.actualQlik.resize()
}

window.changeTiempoSelectorEstructura3 = function (selector) {
  let e = document.querySelectorAll(selector)
  if (e.length > 0) {
    e = e[0]
  }
  let optionSelected = e.options[e.selectedIndex].value

  window.setFilterByValue('#SEM_ACT', optionSelected)

  window.actualQlik.resize()
}

window.changeRatio = function () {
  let e = document.getElementById('ratio')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#TOTALES_RATIO', optionSelected)
  window.actualQlik.resize()
}

window.changeIndicadorMuro = function () {
  let e = document.querySelector('#indicadorMuro')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#MENSAJES_CLIENTES', optionSelected)
  window.actualQlik.resize()
}

window.changeIndicadorWhatsappMuro = function () {
  let e = document.querySelector('#indicadorWhatsappMuro')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#WHATSAPP_MURO', optionSelected)
  window.actualQlik.resize()
}

window.resizeDropdownSeguimiento = function (id) {
  let text = document.querySelectorAll('#selectRetoFilter option')[id]

  let spanWidth = document.querySelectorAll('.filter-seguimiento .span-width')[0]

  let width = 0

  if (text && spanWidth) {
    spanWidth.classList.remove('d-none')
    spanWidth.innerText = text.innerText
    width = spanWidth.getBoundingClientRect().width
    spanWidth.classList.add('d-none')
    width = width + 40

    document.querySelectorAll('.select-seguimiento .selector')[0].style.flex = '0 0 ' + width.toString() + 'px'
    document.querySelectorAll('.select-seguimiento .selector')[0].style.maxWidth = width.toString() + 'px'
  }
}

window.resizeDropdownTipoRecurrencia = function (id) {
  let text = document.querySelectorAll('#selectTipoRecurrencia option')[id]

  let spanWidth = document.querySelectorAll('.filter-tipo-recurrencia .span-width')[0]

  let width = 0

  if (text && spanWidth) {
    spanWidth.classList.remove('d-none')
    spanWidth.innerText = text.innerText
    width = spanWidth.getBoundingClientRect().width
    spanWidth.classList.add('d-none')
    width = width + 40

    document.getElementsByClassName('select-tipo-recurrencia')[0].style.flex = '0 0 ' + width.toString() + 'px'
    document.getElementsByClassName('select-tipo-recurrencia')[0].style.maxWidth = width.toString() + 'px'
  }
}

window.changeSeguimiento = function () {
  let e = document.getElementById('selectRetoFilter')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#Seguimiento', optionSelected)
  if (optionSelected) {
    localStorage.setItem('filterReto', optionSelected)
  }

  window.resizeDropdownSeguimiento(e.selectedIndex)
  window.initializeDropdownReto()
  // window.$eventBus.$emit('reloadSelectRetos')
  window.$eventBus.$emit('reloadTabDynamicKpi')
  window.actualQlik.resize()
}

window.changeTipoRecurrencia = function () {
  let e = document.getElementById('selectTipoRecurrencia')
  let optionSelected = e.options[e.selectedIndex].value
  window.setFilterByValue('#Tipo_Recurrencia', optionSelected)
  if (optionSelected) {
    localStorage.setItem('tipoRecurrencia', optionSelected)
  }

  window.resizeDropdownTipoRecurrencia(e.selectedIndex)
  // window.initializeDropdownReto()
  window.actualQlik.resize()
}

window.changeCampana = function (type) {

  let e = document.querySelector('#selectCampanaFilter')
  let optionSelected = e.options[e.selectedIndex].value

  let kpis = document.querySelectorAll('.card-listkpi .kpis .kpi')

  for (let i = 0; i < kpis.length; i++) {
    if (!kpis[i].classList.contains('d-none')) {
      kpis[i].classList.add('d-none')
    }
  }

  if (optionSelected) {
    if (window.location.href.includes('acciones')) {
      window.setFilterByValue('#CAMPANA', optionSelected)
    } else if (window.location.href.includes('informes')) {
      window.setFilterByValue('#INFORME', optionSelected).then(() =>{
        window.initializeTiempoSelectorInformes()
      })
    }

    localStorage.setItem('filterCampana', optionSelected)
  }

  let valueOpMargen = document.querySelectorAll('#op_margen option')

  if (valueOpMargen.length > 0) {

    valueOpMargen = valueOpMargen[0].innerText

    let filters = document.querySelectorAll('#op_margen')
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].value != valueOpMargen) {
        filters[i].value = valueOpMargen
      }
    }
    window.setFilterByValue('#OP_MARGEN', valueOpMargen)
  }

  let valueTotalMedia = document.querySelectorAll('#total_media option')

  if (valueTotalMedia.length > 0) {
    valueTotalMedia = valueTotalMedia[0].innerText
    let filters = document.querySelectorAll('#total_media')
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].value != valueTotalMedia) {
        filters[i].value = valueTotalMedia
      }
    }

    window.setFilterByValue('#TOTALES_RATIO', valueTotalMedia)
  }

  let valueVisionProducto = document.querySelectorAll('#vision_producto option')

  if (valueVisionProducto.length > 0) {
    valueVisionProducto = valueVisionProducto[0].innerText
    let filters = document.querySelectorAll('#vision_producto')
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].value != valueVisionProducto) {
        filters[i].value = valueVisionProducto
      }
    }

    window.setFilterByValue('#VISION_PRODUCTO', valueVisionProducto)
  }

  window.resizeDropdownCampana(e.selectedIndex)

  window.actualQlik.resize()
}

window.resizeDropdownCampana = function (id) {
  setTimeout(function () {
    if (document.querySelectorAll('#selectCampanaFilter option')[id]) {
      let text = document.querySelectorAll('#selectCampanaFilter option')[id].innerText
      let width = text.length * 8.5

      if (width < 200) {
        width = text.length * 10
      }

      document.querySelector('#selectCampanaFilter').style.flex = '0 0 ' + width.toString() + 'px'
    }
  }, 200);
}

window.checkFilterReto = function () {
  let filter = localStorage.getItem('filterReto')
  if (filter) {
    window.setFilterByValue('#Seguimiento', filter)
  }

  if (localStorage.getItem('retosRecurrencia') && localStorage.getItem('retosRecurrencia') == '1') {
    let recurrencia = localStorage.getItem('filterExperiencia')

    if (recurrencia) {
      window.setFilterByValue('#Tipo_Recurrencia', recurrencia)
      localStorage.setItem('tipoRecurrencia', recurrencia)
    }
  }
}

// window.actionTipoRecurrencias = function () {
//   window.app.createGenericObject({
//     variableValue: {
//       qStringExpression: '#TipoRecurrencias'
//     }
//   }, function (reply) {
//     // window.app.destroySessionObject(reply.qInfo.qId).then(function () {
//     //   if (reply.variableValue) {
//     //     if(reply.variableValue == '-'){
//     //       if(localStorage.getItem('tipoRecurrencia')){
//     //         window.setFilterByValue('#TipoRecurrencias',localStorage.getItem('tipoRecurrencia'))
//     //       }
//     //     }
//     //   }
//     // })

//       if (reply.variableValue) {
//         if(reply.variableValue == '-'){
//           if(localStorage.getItem('tipoRecurrencia')){
//             window.setFilterByValue('#TipoRecurrencias',localStorage.getItem('tipoRecurrencia'))
//           }
//         }
//       }
//   })
// }

// window.listenerTipoRecurrencias = function () {
//   if (window.app) {
//     window.selState = window.app.selectionState();
//     window.selState.OnData.bind(window.actionTipoRecurrencias);
//   }
// }

// window.destroyListenerTipoRecurrencias = function () {
//   if (window.app) {
//     window.selState = window.app.selectionState();
//     window.selState.OnData.unbind(window.actionTipoRecurrencias);
//   }
// }


window.actionShowPosition = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_Filter_Posicion)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {

        if (reply.variableValue > 1) {
          if (document.querySelectorAll('.filter-position .border-select')[0].classList.contains('d-none')) {
            document.querySelectorAll('.filter-position .title-position')[0].classList.remove('d-none')
            document.querySelectorAll('.filter-position .fa-bar-chart')[0].classList.remove('d-none')
            document.querySelectorAll('.filter-position .border-select')[0].classList.remove('d-none')
          }

          if (document.querySelectorAll('#selectFilterPosition .dt-position')[0].classList.contains('d-none')) {
            document.querySelectorAll('#selectFilterPosition .dt-position')[0].classList.remove('d-none')
          }

          if (document.querySelectorAll('#selectFilterPosition .superior-position')[0].classList.contains('d-none')) {
            document.querySelectorAll('#selectFilterPosition .superior-position')[0].classList.remove('d-none')
          }
        }
        else {
          if (!document.querySelectorAll('.filter-position .border-select')[0].classList.contains('d-none')) {
            document.querySelectorAll('.filter-position .title-position')[0].classList.add('d-none')
            document.querySelectorAll('.filter-position .fa-bar-chart')[0].classList.add('d-none')
            document.querySelectorAll('.filter-position .border-select')[0].classList.add('d-none')
          }
        }

        if (reply.variableValue == 2) {
          if (document.getElementById('selectFilterPosition').value > 1) {
            document.getElementById('selectFilterPosition').value = 1
          }
          if (!document.querySelectorAll('#selectFilterPosition .dt-position')[0].classList.contains('d-none')) {
            document.querySelectorAll('#selectFilterPosition .dt-position')[0].classList.add('d-none')
          }
          if (!document.querySelectorAll('#selectFilterPosition .superior-position')[0].classList.contains('d-none')) {
            document.querySelectorAll('#selectFilterPosition .superior-position')[0].classList.add('d-none')
          }
        }
        else if (reply.variableValue == 3) {
          if (document.getElementById('selectFilterPosition').value > 2) {
            document.getElementById('selectFilterPosition').value = 2
          }
          if (!document.querySelectorAll('#selectFilterPosition .superior-position')[0].classList.contains('d-none')) {
            document.querySelectorAll('#selectFilterPosition .superior-position')[0].classList.add('d-none')
          }
        }
      }
    })
  })
}

window.listenerShowPosition = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionShowPosition);
  }
}

window.destroyListenerShowPosition = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionShowPosition);
  }
}

window.actionRangoFechas = function () {
  if(window.app){
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_rango_fechas_activo)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          if (parseInt(reply.variableValue) > 0) {
            window.app.createGenericObject({
              variableValue: {
                qStringExpression: '=(vL_Title_Rango_Fechas_Seleccionado)'
              }
            }, function (reply2) {
              try{
                window.app.destroySessionObject(reply2.qInfo.qId).then(function () {
                  if (reply2.variableValue) {
                    for (let element of document.querySelectorAll('.disabled-option')) {
                      element.innerText = reply2.variableValue
                    }
  
                    for (let element of document.querySelectorAll('#' + window.selectorAux)) {
                      element.options.selectedIndex = element.options.length - 1
                    }  
                  }
                })
              }catch(e){
                console.log(e)
              }
              
            })
          } else {
            for (let element of document.getElementsByClassName('disabled-option')) {
              element.innerText = ''
            }
  
            const selectors = document.querySelectorAll('#' + window.selectorAux)
  
            let actualFieldValue = undefined
  
            for (let s of window.app.selectionState().selections) {
              if (s.fieldName === '#SELECTOR_TIEMPO') {
                actualFieldValue = s.qSelected
                break
              }
            }
  
            for (let s of selectors) {
              for (let opt of s.options) {
                if (opt._value === actualFieldValue) {
                  opt.selected = 'selected'
                  break
                }
              }
            }
  
          }
        }
      })
    })
  }
  
}

window.selectorAux = undefined

window.listenerRangoFechas = function (idSelector) {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selectorAux = idSelector
    window.actionRangoFechas()
    window.selState.OnData.bind(window.actionRangoFechas);
  }
}

window.destroyListenerRangoFechas = function (idSelector) {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selectorAux = idSelector
    window.selState.OnData.unbind(window.actionRangoFechas);
  }
}


//Acción del listener de recurrencia que oculta el filtro de año
window.actionListenerRecurrencia = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_tipo_recurrencia)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (parseInt(reply.variableValue) == 0) {
          // let filter = document.querySelectorAll('.sidebar-right .qbo-Sdzhe')[0]
          // if(filter && !filter.classList.contains('d-none')){
          //   filter.classList.add('d-none')
          // }
          let customFilter = document.querySelectorAll('.custom-filters .filter-tipo-recurrencia')[0]
          if (customFilter && !customFilter.classList.contains('d-none')) {
            customFilter.classList.add('d-none')
          }
        }
        else if (parseInt(reply.variableValue) == 1) {
          // let filter = document.querySelectorAll('.sidebar-right .qbo-Sdzhe')[0]
          // if(filter && !filter.classList.contains('d-none')){
          //   filter.classList.add('d-none')
          // }
          let customFilter = document.querySelectorAll('.custom-filters .filter-tipo-recurrencia')[0]
          if (customFilter && customFilter.classList.contains('d-none')) {
            customFilter.classList.remove('d-none')
          }
        }
      }
    })
  })
}

//Listener que comprueba los cambios de la variable de recurrencia
window.listenerRecurrencia = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerRecurrencia);
  }
}

//Destroy del listener que comprueba los cambios de la variable de recurrencia
window.destroyListenerRecurrencia = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerRecurrencia);
  }
}


window.actionPosition = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_Total_Posicion)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (window.innerWidth > 1024) {
          if (reply.variableValue == 1) {
            if (!document.getElementsByClassName('position-data')[0].classList.contains('d-none')) {
              Array.prototype.forEach.call(document.getElementsByClassName('position-data'), function (e) {
                e.classList.add('d-none')
              })
              Array.prototype.forEach.call(document.getElementsByClassName('position-guion'), function (e) {
                e.classList.remove('d-none')
              })
            }
          }
          if (reply.variableValue == 0) {
            if (document.getElementsByClassName('position-data')[0].classList.contains('d-none')) {
              Array.prototype.forEach.call(document.getElementsByClassName('position-data'), function (e) {
                e.classList.remove('d-none')
              })
              Array.prototype.forEach.call(document.getElementsByClassName('position-guion'), function (e) {
                e.classList.add('d-none')
              })
            }
          }
        }
      }
    })
  })
}

window.listenerPosition = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionPosition);
  }
}

window.destroyListenerPosition = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionPosition);
  }
}

//Comprueba si hay filtros activos y activa o desactiva el check rojo
window.actionListener = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_Selecciones_Activas)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let object;
        if (window.innerWidth < 1025) {
          object = '.menu-mobile .checkFilter'
        }
        else {
          object = '.menu-pc .checkFilter'
        }
        if (reply.variableValue == '1') {
          if (document.querySelectorAll(object)[0].classList.contains('d-none')) {
            document.querySelectorAll(object)[0].classList.remove('d-none')
          }
        }
        else {
          if (!document.querySelectorAll(object)[0].classList.contains('d-none')) {
            document.querySelectorAll(object)[0].classList.add('d-none')
          }
        }
      }
    })
  })
}


window.listenerCheckFilter = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListener);
  }
}

window.destroyListenerCheckFilter = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListener);
  }
}

// window.actionListenerTiempo = function () {
//   window.app.createGenericObject({
//     variableValue: {
//       qStringExpression: '=$(vL_Alerta_Semana)'
//     }
//   }, function (reply) {
//     window.app.destroySessionObject(reply.qInfo.qId).then(function () {
//       if (reply.variableValue) {
//         let icon;
//         let tooltip_1;
//         let tooltip_2;
//         if (window.innerWidth < 1025) {
//           icon = '.mobile-version .icon-warning'
//           tooltip_1 = '.mobile-version .tiempo-warning-info .tooltip-1'
//           tooltip_2 = '.mobile-version .tiempo-warning-info .tooltip-2'
//         }
//         else {
//           icon = '.pc-version .icon-warning'
//           tooltip_1 = '.pc-version .tiempo-warning-info .tooltip-1'
//           tooltip_2 = '.pc-version .tiempo-warning-info .tooltip-2'
//         }

//         if (reply.variableValue > 0) {
//           if (document.querySelectorAll(icon)[0].classList.contains('d-none')) {
//             document.querySelectorAll(icon)[0].classList.remove('d-none')
//           }

//           if (reply.variableValue == 1) {
//             if (document.querySelectorAll(tooltip_1)[0].classList.contains('d-none')) {
//               document.querySelectorAll(tooltip_1)[0].classList.remove('d-none')
//             }
//             if (!document.querySelectorAll(tooltip_2)[0].classList.contains('d-none')) {
//               document.querySelectorAll(tooltip_2)[0].classList.add('d-none')
//             }

//             localStorage.setItem('alerta-semana', 1)
//           }
//           if (reply.variableValue == 2) {
//             if (!document.querySelectorAll(tooltip_1)[0].classList.contains('d-none')) {
//               document.querySelectorAll(tooltip_1)[0].classList.add('d-none')
//             }
//             if (document.querySelectorAll(tooltip_2)[0].classList.contains('d-none')) {
//               document.querySelectorAll(tooltip_2)[0].classList.remove('d-none')
//             }
//             localStorage.setItem('alerta-semana', 1)
//           }
//         }
//         else {
//           if (!document.querySelectorAll(object + ' .icon-warning')[0].classList.contains('d-none')) {
//             document.querySelectorAll(object + ' .icon-warning')[0].classList.add('d-none')
//           }
//           localStorage.setItem('alerta-semana', 0)
//         }
//       }
//     })
//   })
// }

window.listenerCheckTiempo = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerTiempo);
  }
}

window.destroyListenerCheckTiempo = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerTiempo);
  }
}

window.openCloseInfo = function () {
  let popup = document.querySelectorAll('.mobile-version .tiempo-warning-info')[0]
  if (popup.classList.contains('d-none')) {
    popup.classList.remove('d-none')
  }
  else {
    popup.classList.add('d-none')
  }
}

window.actionTabObjectJerarquia = function () {
  window.page = 'detalleretos'
  window.actionBreadcrumbDT()
  window.checkTabObject()
}

window.actionBreadcrumbJP = function () {
  if (window.app && window.app.createGenericObject) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_DrillDown_Product)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          let object;
          if (window.page == 'catalogocompleto') {
            if (window.innerWidth < 1024) {
              object = '.breadcrumb-' + window.page + '-productos-mobile'
            }
            else {
              object = '.breadcrumb-' + window.page + '-productos-pc'
            }
          }

          if (reply.variableValue >= '1') {
            let object_final = object + ' .agrupacion'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .agrupacion'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }
          if (reply.variableValue >= 2) {
            let object_final = object + ' .familia'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .familia'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }
          if (reply.variableValue >= 3) {
            let object_final = object + ' .subfamilia'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .subfamilia'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }
          if (reply.variableValue >= 4) {
            let object_final = object + ' .producto'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .producto'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }
        }
      })
    })
  }
}

window.actionBreadcrumbDT = function () {
  if (window.app && window.app.createGenericObject) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_DrillDown_Highlight)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          let object;
          if (window.page == 'ventasdiarias' || window.page == 'ventashistoricas' || window.page == 'catalogocompleto' || window.page == 'nps' || window.page == 'citas') {
            if (window.innerWidth < 1024) {
              object = '.breadcrumb-' + window.page + '-mobile'
            }
            else {
              object = '.breadcrumb-' + window.page + '-pc'
            }
          }

          if (window.page == 'accionescomerciales') {
            if (window.innerWidth < 1024) {
              object = '.bread-ac-mobile'
            }
            else {
              object = '.bread-ac-pc'
            }
          }

          if (window.page == 'informesoficina') {
            if (window.innerWidth < 1024) {
              object = '.bread-ic-mobile'
            }
            else {
              object = '.bread-ic-pc'
            }
          }

          if (window.page == 'cpe' || window.page == 'retos' || window.page == 'detalleretos') {
            if (window.innerWidth < 1024) {
              object = '.common-carousel-object .breadcrumb-' + window.page
              if (!document.querySelectorAll('.common-carousel-object .jerarquia-a')[0].classList.contains('d-none')) {
                object = '.common-carousel-object .jerarquia-a .breadcrumb-' + window.page
              }
              if (!document.querySelectorAll('.common-carousel-object .jerarquia-b')[0].classList.contains('d-none')) {
                object = '.common-carousel-object .jerarquia-b .breadcrumb-' + window.page
              }
            }
            else {
              object = '.common-tab-object .breadcrumb-' + window.page
              if (!document.querySelectorAll('.common-tab-object .jerarquia-a')[0].classList.contains('d-none')) {
                object = '.common-tab-object .jerarquia-a .breadcrumb-' + window.page
              }
              if (!document.querySelectorAll('.common-tab-object .jerarquia-b')[0].classList.contains('d-none')) {
                object = '.common-tab-object .jerarquia-b .breadcrumb-' + window.page
              }
            }
          }

          if (reply.variableValue >= 1) {
            let object_final = object + ' .dt'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .dt'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }

          if (reply.variableValue >= 2) {
            let object_final = object + ' .dc'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .dc'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }

          if (reply.variableValue >= 3) {
            let object_final = object + ' .dan'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .dan'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }

          if (reply.variableValue >= 4) {
            let object_final = object + ' .oficina'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .oficina'
            if (document.querySelectorAll(object_final)[0].classList.contains('active')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }

          if (reply.variableValue >= 5 && page == 'detalleretos') {
            let object_final = object + ' .empleado'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active') && !document.querySelectorAll(object_final)[0].classList.contains('d-none')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .empleado'
            if (document.querySelectorAll(object_final)[0].classList.contains('active') && !document.querySelectorAll(object_final)[0].classList.contains('d-none')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }

          if (reply.variableValue >= 6 && page == 'detalleretos') {
            let object_final = object + ' .cartera'
            if (!document.querySelectorAll(object_final)[0].classList.contains('active') && !document.querySelectorAll(object_final)[0].classList.contains('d-none')) {
              document.querySelectorAll(object_final)[0].classList.add('active')
            }
          }
          else {
            let object_final = object + ' .cartera'
            if (document.querySelectorAll(object_final)[0].classList.contains('active') && !document.querySelectorAll(object_final)[0].classList.contains('d-none')) {
              document.querySelectorAll(object_final)[0].classList.remove('active')
            }
          }
        }
      })
    })
  }
}

window.listenerBreadcrumb = function (page) {
  if (window.app) {
    window.selState = window.app.selectionState();

    window.page = page
    window.selState.OnData.bind(window.actionBreadcrumbDT);
  }
}

window.destroyListenerBreadcrumb = function () {
  if (window.app) {
    //localStorage.setItem("lastpage",window.getActualPage())
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionBreadcrumbDT)
  }
}

window.listenerBreadcrumbProductos = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionBreadcrumbJP);
  }
}
window.destroyListenerBreadcrumbProductos = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionBreadcrumbJP)
  }
}

//Listener para mantener las selecciones de vision detalle al recargar 
window.listenerVisionDetalleSelections = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.saveCurrentSelections);
  }
}
//Destruccion listener de la variable vL_flag_oficina_negocio en nps
window.destroyListenerVisionDetalleSelections = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.saveCurrentSelections);
  }
}

window.selectedValuesToString = function (selectedValues) {
  let result = ''
  for (let i = 0; i < selectedValues.length; i++) {
    result += selectedValues[i].qName
    if (selectedValues.length - 1 > i) {
      result += ','
    }
  }
  return result
}


window.saveCurrentSelections = function () {
  if (window.app) {
    try {
      // Obtener el estado de las selecciones
      let selections = window.app.selectionState().selections;

      // Usar un bucle `for...of` con `await` asegura que las operaciones sean secuenciales
      let promises = []
      for (let s of selections) {

        let p = new Promise((resolve, reject) => {

          let txt = ''
          txt += s.fieldName + "|";

          if (s.fieldName === 'Fecha' || s.fieldName === 'Mes' || s.fieldName === 'Semana') {
            
              window.getElemNumbers(s.fieldName).then((fechasElem)=>{
                console.log(fechasElem)
                txt += fechasElem.join(',');
                txt += "|";
                resolve(txt)
            });
            
          } else {
            // Transformar los valores seleccionados en cadena
            txt += window.selectedValuesToString(s.selectedValues);
            txt += "|";
            resolve(txt)
          }
          
        })

        promises.push(p)
        
      }

      Promise.all(promises).then(r =>{
        let localStorageSelections = r.join('')
        // Guardar las selecciones en localStorage
        localStorage.setItem("selections", localStorageSelections);
        return localStorageSelections; // Devolver la cadena de selecciones guardada
      } )


      
    } catch (error) {
      // Manejo de errores en caso de fallo
      console.error("Error al guardar las selecciones:", error);
      throw error; // Lanzar el error para que se pueda manejar en otro lugar
    }
  } else {
    throw new Error("No se pudo acceder a window.app");
  }
};




window.getElemNumbers = async function(field){
  return new Promise ((resolve, reject ) => {
    window.app.createList(window.cubeDefinition(field)).then(reply => {
      resolve(reply.layout.qListObject.qDataPages[0].qMatrix.filter(e => e[0].qState === 'S').map(e => e[0].qElemNumber))
    })
  })
}

window.saveCurrentSelectionsAndRoute = function (route) {

  // window.saveCurrentSelections().then(() => {
     window.$viewInstanceVue.$router.push({ path: route })
  // })
  //window.navigatePage(route)
}

window.seteoFiltroCadena = function(index, selections){
  if(selections.length-2 > index)
  window.setFilterByMultipleValues(selections[index], selections[index + 1].split(",").map(e => e.trim())).then((res)=>{
    window.seteoFiltroCadena(index+2,selections)
  })
}

window.applyCurrentSelections = async function () {
  if (window.app) {
    //window.app.clearAll().then(() => {
      let localStorageSelections = localStorage.getItem("selections").split("|")
      let fields = []
      let values = []
      for (let i = 0; i <= localStorageSelections.length - 2; i = i + 2) {
        fields.push(localStorageSelections[i])
        values.push(localStorageSelections[i + 1])
      }
      for (let i = 0; i < values.length; i++) {
        values[i] = values[i].split(",").map(e => e.trim())
      }


      let p = undefined

      for (let i = 0; i < fields.length; i++) {
        window.setFilterByMultipleValues(fields[i], values[i])
      
       }
      
    
  }
}


window.listenerDontClearFilterCampana = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.dontClearFilterCampana);
  }
}
window.destroyListenerDontClearFilterCampana = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.dontClearFilterCampana)
  }
}

window.dontClearFilterCampana = function () {
  if (window.app) {
    let filterExists = false
    window.selState = window.app.selectionState();
    for (let i = 0; i < window.selState.selections.length; i++) {
      if (window.selState.selections[i].fieldName == "#CAMPANA") {
        localStorage.setItem('filterCampana', window.selState.selections[i].qSelected.toString())
        filterExists = true
      }
    }
    if (!filterExists) {
      let value = localStorage.getItem('filterCampana')
      window.canBeSelected('#CAMPANA', value).then(reply => {
        if(reply){
          window.setFilterByValue('#CAMPANA', value)
        }else{
          window.selectFirstOptionPosible('#CAMPANA')
        }
      }) 
      }
  }
}

window.listenerDontClearFilterSeguimiento = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.dontClearFilterSeguimiento);
  }
}
window.destroyListenerDontClearFilterSeguimiento = function () {
  if (window.app) {
    window.selState = window.app.selectionState();

    window.selState.OnData.unbind(window.dontClearFilterSeguimiento)
  }
}

window.dontClearFilterSeguimiento = function () {
  if (window.app) {
    let filterExists = false
    window.selState = window.app.selectionState();
    for (let i = 0; i < window.selState.selections.length; i++) {
      if (window.selState.selections[i].fieldName == "#Seguimiento") {
        localStorage.setItem('filterReto', window.selState.selections[i].qSelected.toString())
        filterExists = true
      }
    }
    if (!filterExists) {
      window.setFilterByValue('#Seguimiento', localStorage.getItem('filterReto'))
    }
  }
}


window.checkReto = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(#Seguimiento)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {

      if (reply.variableValue) {
        let value = ''
        if (reply.variableValue == '-') {
          if (localStorage.getItem('filterReto')) {
            value = localStorage.getItem('filterReto')
          }
          else {
            value = 'Nóminas'
          }
          if (document.getElementById('selectRetoFilter').value != value) {
            document.getElementById('selectRetoFilter').value = value
          }
          window.changeSeguimiento()
        }
        else {
          value = reply.variableValue
          if (document.getElementById('selectRetoFilter').value != value) {
            document.getElementById('selectRetoFilter').value = value
          }
        }
        window.optionsSelect()
        window.setHeightKpi()
        window.changeJerarquia()
      }
    })
  });
}

window.listenerReto = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.checkReto);
  }
}

window.destroyListenerReto = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.checkReto);
  }
}

window.checkTipoRecurrencia = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(#Tipo_Recurrencia)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {

      if (reply.variableValue) {
        let value = ''
        if (reply.variableValue == '-') {
          if (localStorage.getItem('tipoRecurrencia')) {
            value = localStorage.getItem('tipoRecurrencia')
          }
          else {
            value = 'Primera Recurrencia'
          }
          if (document.getElementById('selectTipoRecurrencia').value != value) {
            document.getElementById('selectTipoRecurrencia').value = value
          }
          window.changeTipoRecurrencia()
        }
        else {
          value = reply.variableValue
          if (document.getElementById('selectTipoRecurrencia').value != value) {
            document.getElementById('selectTipoRecurrencia').value = value
          }
        }
        window.optionsSelect()
        window.setHeightKpi()
        window.changeJerarquia()
      }
    })
  });
}

window.listenerTipoRecurrencia = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.checkTipoRecurrencia);
  }
}

window.destroyListenerTipoRecurrencia = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.checkTipoRecurrencia);
  }
}



window.actionListenerRed = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(#ANYO_RETOS)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let element = document.querySelectorAll('.filterview .qbo-nPWx')[0]
        if (element) {
          if (reply.variableValue != 'Retos 2021') {
            if (!element.classList.contains('d-none')) {
              element.classList.add('d-none')
            }
          }
          else {
            if (element.classList.contains('d-none')) {
              element.classList.remove('d-none')
              window.actualQlik.resize()
            }
          }
        }
      }
    })
  });
}

window.listenerRed = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerRed);
  }
}

window.destroyListenerRed = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerRed);
  }
}

window.navigatePageHome = function (hash) {

  if (window.getHost() == 'qlspro.lacaixa.es') {

    let href = window.location.href

    let finalUrl = ''

    if (href.includes('qlikTicket')) {
      href = href.split('?qlikTicket=')
      finalUrl = href[0]
      href = href[1].split('#')
      finalUrl = finalUrl + '#' + href[1]
    }
    else {
      finalUrl = href
    }

    finalUrl = finalUrl.replace('qlspro.lacaixa.es', 'qlsnrt.lacaixa.es')
    let division = finalUrl.split('#/')
    finalUrl = division[0] + hash

    window.location.href = finalUrl
  }
  else {
    if (window.isIE() && hash) {
      document.getElementById("link_menu_" + hash.replace('#/', '')).click();
    } else {
      if (window.location.hostname == 'localhost') {
        window.location.hash = hash
      }
      else {
        window.location.href = window.location.href.split('.html')[0] + '.html' + hash
      }
    }
  }
}

window.navigatePage = function (hash) {
  if (window.isIE() && hash) {
    document.getElementById("link_menu_" + hash.replace('#/', '')).click();
  } else {
    if (window.location.hostname == 'localhost') {
      window.location.hash = hash
    }
    else {
      window.location.href = window.location.href.split('.html')[0] + '.html' + hash
    }
  }
}

window.navigateBackPage = function (hash) {
  if (window.location.hash.includes('2020')) {
    hash = '/retos2020'
  }
  else {
    hash = '/retos'
  }

  if (window.isIE() && hash) {
    document.getElementById("link_menu_" + hash.replace('#/', '')).click();
  } else {
    window.location.hash = hash;
  }
}

//Modificar selector objeto detallereto
window.optionsSelect = function () {

  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_Num_Charts)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {

        window.numChart = reply.variableValue

        let variables = ['vL_Title_Indicador1', 'vL_Title_Indicador2', 'vL_Title_Indicador3', 'vL_Title_Indicador4', 'vL_Title_Indicador5', 'vL_Title_Indicador6', 'vL_Title_Indicador7', 'vL_Title_Indicador8']

        let id = ''

        let clases = []

        id = 'selectReto'
        clases = ['oficinaReto', 'mediaAltas', 'altaIngresos', 'ccsTotales', 'ccsTotalesEmpleado', 'finaloption']
        

        for (let i = 0; i < variables.length; i++) {

          if (i < window.numChart) {
            if (document.querySelectorAll('#' + id + ' option')[i].classList.contains('d-none')) {
              document.querySelectorAll('#' + id + ' option')[i].classList.remove('d-none')
            }
            window.app.createGenericObject({
              variableValue: {
                qStringExpression: '=$(' + variables[i] + ')'
              }
            }, function (reply) {
              window.app.destroySessionObject(reply.qInfo.qId).then(function () {
                if (reply.variableValue) {

                  // document.querySelectorAll('#' + id + ' option')[i + 1].value = clases[i + 1]
                  document.querySelectorAll('#' + id + ' option')[i].innerText = reply.variableValue
                }
              })
            })
          }
          else {
            document.querySelectorAll('#' + id + ' option')[i].classList.add('d-none')
          }
        }
      }
    })
  })
}

window.setDynamicTabTitles = function (dimension) {
  let valuesNames = []
  let navElements

  if (dimension == '#VISTA_RETO') {
    navElements = document.querySelectorAll('.retos-dynamic-tab .nav-item .nav-link')
  }
  else if (dimension == '#VISTA_IEC') {
    navElements = document.querySelectorAll('.cpe-dynamic-tab .nav-item .nav-link')
  }

  //Posibilidade de facelo cos valores das variables vL_title_pestanya1, vL_title_pestanya2, vL_title_pestanya3

  window.app.createList(cubeDefinition(dimension), function (reply) {
    let hypercubeId = reply.qInfo.qId
    if (reply.qListObject.qDataPages.length > 0) {
      let values = reply.qListObject.qDataPages[0].qMatrix
      for (let i = 0; i < values.length; i++) {
        navElements[i].innerText = values[i][0].qText
      }
    }
  });
}

window.applyDynamicTabFilter = function (dimension, actualTab) {
  let valueToApply
  window.app.createList(cubeDefinition(dimension), function (reply) {
    let hypercubeId = reply.qInfo.qId
    if (reply.qListObject.qDataPages.length > 0) {
      let values = reply.qListObject.qDataPages[0].qMatrix
      valueToApply = values[actualTab][0].qText
    }
  });
  window.setFilterByValue(dimension, valueToApply)
}


window.setHeightKpi = function () {

  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_Num_KPI)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        window.numKpis = reply.variableValue

        setTimeout(function () {

          if (document.getElementsByClassName('detalleretos').length > 0 || document.getElementsByClassName('accionescomerciales').length > 0) {

            let kpis = document.querySelectorAll('.card-dynamickpi .col-6')
            let card = document.querySelectorAll('.card-dynamickpi .col-6 .dynamickpi-content')
            let titles = document.querySelectorAll('.card-dynamickpi .col-6 .kpi-title')
            let body = document.querySelectorAll('.card-dynamickpi .col-6 .kpi-body')

            let height = 0
            if (window.numKpis > 3 && window.innerWidth > 1023) {

              height = document.getElementsByClassName('card-dynamickpi')[0].clientHeight - document.getElementsByClassName('dynamickpi-title')[0].clientHeight - document.querySelectorAll('.card-dynamickpi .tabs-container')[0].clientHeight

              if (document.getElementsByClassName('cpe').length > 0) {
                if (window.numKpis < 5) {
                  height = height / 2 - 10
                }
                else {
                  height = height / 3 - 20
                }
              }
              else {
                if (window.numKpis < 7) {
                  height = height / 2 - 10
                }
                else {
                  height = height / 3 - 10
                }
              }

            }

            if (titles.length > 0) {
              let max_title = titles[0].clientHeight;
              let max_body = body[0].clientHeight;

              for (let i = 0; i < titles.length; i++) {
                if (window.numKpis > 3 && window.innerWidth > 1023) {
                  card[i].style.height = height.toString() + 'px'
                }
                if (i < window.numKpis) {
                  if (kpis[i].classList.contains('d-none')) {
                    kpis[i].classList.remove('d-none')
                  }
                  if (max_title < titles[i].clientHeight) {
                    max_title = titles[i].clientHeight
                  }
                  if (max_body < body[i].clientHeight) {
                    max_body = body[i].clientHeight
                  }
                }
                else {
                  if (!kpis[i].classList.contains('d-none')) {
                    kpis[i].classList.add('d-none')
                  }
                }
              }
              for (let i = 0; i < titles.length; i++) {
                titles[i].style.height = max_title.toString() + 'px'
                body[i].style.height = max_body.toString() + 'px'
              }
            }

            if (window.innerWidth < 1023) {
              if (document.querySelectorAll('.component-simple-object')[0] && document.getElementsByClassName('card-dynamickpi')[0]) {
                document.querySelectorAll('.component-simple-object')[0].style.height = document.getElementsByClassName('card-dynamickpi')[0].clientHeight.toString() + 'px'
              }
            }
          }
        }, 100);
      }
    })
  })
}

window.changeJerarquia = function () {

  if (window.app && window.app.createGenericObject) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=(vL_Selector_Indicador)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          let object;
          if (window.innerWidth < 1025) {
            object = '.common-carousel-object'
          }
          else {
            object = '.common-tab-object'
          }

          let hide
          let show

          if (reply.variableValue == 1) {
            show = object + ' .jerarquia-a'
            hide = object + ' .jerarquia-b'
          }
          else {
            show = object + ' .jerarquia-b'
            hide = object + ' .jerarquia-a'
          }

          if (document.querySelectorAll(hide).length > 0 && !document.querySelectorAll(hide)[0].classList.contains('d-none')) {
            document.querySelectorAll(hide)[0].classList.add('d-none')
          }
          if (document.querySelectorAll(show).length > 0 && document.querySelectorAll(show)[0].classList.contains('d-none')) {
            document.querySelectorAll(show)[0].classList.remove('d-none')
          }

          window.actualQlik.resize()
        }
      })
    })
  }
}

window.checkAppConnection = function () {
  if (window.app && window.app.createGenericObject) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_Selecciones_Activas)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () { });
    }).catch(function (e) {
      window.location.reload();
    });
  }
};

window.actionVisibilityChange =  function () {
  var hash = window.location.hash;
  var variable = undefined;

  if (hash.includes('timeout')) {
    hash = hash.split('timeout=');

    if (!isNaN(hash[1])) {
      variable = hash[1];
    }
  }

  if (variable == undefined) {
    if (window.innerWidth < 1025) {
      variable = 180000;
    } else {
      variable = 300000;
    }
  }

  if (document.visibilityState === 'visible') {
    window.checkAppConnection();
    clearTimeout(window.timeoutVariable);
  } else {
    window.timeoutVariable = setTimeout(function () {
      if (window.app && window.app.close) {
        window.app.close();
      }
    }, variable);
  }
}


window.crearPopup = function() {
  // Crear el elemento del fondo del popup
  var fondoPopup = document.createElement('div');
  fondoPopup.classList.add('fondo-popup')

  // Crear el contenedor del popup
  var contenedorPopup = document.createElement('div');
  contenedorPopup.classList.add('contenedor-popup')

  // Crear el mensaje del popup
  var mensaje = document.createElement('p');
  mensaje.textContent = 'Sesión caducada. Pulsa recargar.';
  contenedorPopup.appendChild(mensaje);

  // Crear el botón para cerrar el popup y recargar la página
  var botonRecargar = document.createElement('button');
  botonRecargar.textContent = 'Recargar';
  botonRecargar.onclick = function() {
      window.location.reload();
  };
  contenedorPopup.appendChild(botonRecargar);

  // Agregar el contenedor al fondo del popup
  fondoPopup.appendChild(contenedorPopup);

  // Agregar el fondo del popup al documento
  document.body.appendChild(fondoPopup);
}

window.backgroundBack = function () {
  if(window.app){
    window.app.on("error", function ( error ) {
      if(error.message === 'ProxyError.OnSessionTimedOut' || error.message === 'ProxyError.OnSessionClosed' || error.message === 'ProxyError.OnSessionLoggedOut'){
        window.crearPopup()
      }
      
    })
  }
  //document.addEventListener("visibilitychange",window.actionVisibilityChange);
};

window.destroyBackgroundBack = function () {
  if(window.app){
    window.app.off("error")
  }
  //document.removeEventListener("visibilitychange",window.actionVisibilityChange)
};

window.abrirCerrar = function () {
  if (document.querySelectorAll('.mobile-version .subcards')[0].classList.contains('d-none')) {
    document.querySelectorAll('.mobile-version .subcards')[0].classList.remove('d-none')
  }
  else {
    document.querySelectorAll('.mobile-version .subcards')[0].classList.add('d-none')
  }
}



// window.checkTabObject = function(){

//   setTimeout(function(){

//     if(document.getElementsByClassName('jerarquia-a')[0].style.display != 'none'){
//       window.changeJerarquia()
//     }

//     if(!document.getElementsByClassName('fil-oficina-variable')[0].classList.contains('d-none')){
//       document.getElementsByClassName('fil-oficina-variable')[0].classList.add('d-none')
//     }
//     if(!document.getElementsByClassName('fil-empleado-variable')[0].classList.contains('d-none')){
//       document.getElementsByClassName('fil-empleado-variable')[0].classList.add('d-none')
//     }

//     if(window.app && window.app.createGenericObject){
//       window.app.createGenericObject({
//         variableValue: {
//             qStringExpression: '=(vL_Filter_Tipo_Oficina)'
//         }
//       }, function (reply) {
//         window.app.destroySessionObject(reply.qInfo.qId).then(function() {
//           if(reply.variableValue != 1){

//             let oficina = document.getElementsByClassName('graph-oficina')
//             for(let i=0;i<oficina.length;i++){
//               if(!oficina[i].classList.contains('d-none')){
//                 if(document.getElementsByClassName('fil-oficina-variable')[0].classList.contains('d-none')){
//                   document.getElementsByClassName('fil-oficina-variable')[0].classList.remove('d-none')
//                 }
//                 break
//               }
//             }
//           }
//           else{
//             if(document.getElementsByClassName('fil-oficina-variable')[0].classList.contains('d-none')){
//               document.getElementsByClassName('fil-oficina-variable')[0].classList.remove('d-none')
//             }
//           }
//           window.actionOficinaEmpleado()
//           if(window.actualQlik){
//             window.actualQlik.resize()
//           }

//         })
//       })
//     }


//     if(window.app && window.app.createGenericObject){
//       window.app.createGenericObject({
//         variableValue: {
//             qStringExpression: '=(vL_Filter_Tipo_Empleado)'
//         }
//       }, function (reply) {
//         window.app.destroySessionObject(reply.qInfo.qId).then(function() {
//           if(reply.variableValue != 1){

//             let empleado = document.getElementsByClassName('graph-empleado')
//             for(let i=0;i<empleado.length;i++){
//               if(!empleado[i].classList.contains('d-none')){
//                 if(document.getElementsByClassName('fil-empleado-variable')[0].classList.contains('d-none')){
//                   document.getElementsByClassName('fil-empleado-variable')[0].classList.remove('d-none')
//                 }
//                 break
//               }
//             }
//           }
//           else{
//             if(document.getElementsByClassName('fil-empleado-variable')[0].classList.contains('d-none')){
//               document.getElementsByClassName('fil-empleado-variable')[0].classList.remove('d-none')
//             }
//           }
//           window.actionOficinaEmpleado()
//           if(window.actualQlik){
//             window.actualQlik.resize()
//           }
//         })
//       })
//     }

//   },1000);
// }


window.checkTabObject = function () {

  setTimeout(function () {

    if (document.getElementsByClassName('jerarquia-a')[0] && document.getElementsByClassName('jerarquia-a')[0].style.display != 'none') {
      window.changeJerarquia()
    }

    if (document.getElementsByClassName('fil-oficina')[0] && !document.getElementsByClassName('fil-oficina')[0].classList.contains('d-none')) {
      document.getElementsByClassName('fil-oficina')[0].classList.add('d-none')
    }
    if (document.getElementsByClassName('fil-empleado')[0] && !document.getElementsByClassName('fil-empleado')[0].classList.contains('d-none')) {
      document.getElementsByClassName('fil-empleado')[0].classList.add('d-none')
    }

    let check = 0

    let oficina = document.getElementsByClassName('graph-oficina')
    for (let i = 0; i < oficina.length; i++) {
      if (!oficina[i].classList.contains('d-none')) {
        check = 1
        if (document.getElementsByClassName('fil-oficina')[0].classList.contains('d-none') &&
          document.getElementsByClassName('fil-oficina-variable')[0] && document.getElementsByClassName('fil-oficina-variable')[0].style.display == 'none') {
          document.getElementsByClassName('fil-oficina')[0].classList.remove('d-none')
        }
        break
      }
    }

    let empleado = document.getElementsByClassName('graph-empleado')
    for (let i = 0; i < empleado.length; i++) {
      if (!empleado[i].classList.contains('d-none')) {
        check = 1
        if (document.getElementsByClassName('fil-empleado')[0].classList.contains('d-none') &&
          document.getElementsByClassName('fil-empleado-variable')[0] && document.getElementsByClassName('fil-empleado-variable')[0].style.display == 'none') {
          document.getElementsByClassName('fil-empleado')[0].classList.remove('d-none')
        }
        break
      }
    }

    window.actionOficinaEmpleado()
    if (window.actualQlik) {
      window.actualQlik.resize()
    }

  }, 1000);
}


// Oculta y muestra filtros en función de las variables
window.actionOficinaEmpleado = function () {
  if (window.app && window.app.createGenericObject) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_Filter_Tipo_Oficina)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          if (!document.getElementsByClassName('fil-oficina')[0].classList.contains('d-none')) {
            document.getElementsByClassName('fil-oficina-variable')[0].style.display = 'none'
            document.getElementsByClassName('fil-empleado-variable')[0].style.display = 'none'
          }
        }
      })
    })
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_Filter_Tipo_Empleado)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          if (!document.getElementsByClassName('fil-empleado')[0].classList.contains('d-none')) {
            document.getElementsByClassName('fil-empleado-variable')[0].style.display = 'none'
            document.getElementsByClassName('fil-oficina-variable')[0].style.display = 'none'
          }
        }
      })
    })
  }
}

window.listenerOficinaEmpleado = function () {
  if (window.innerWidth > 1024) {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.bind(window.actionOficinaEmpleado);
    }
  }
}

window.destroyListenerOficinaEmpleado = function () {
  if (window.innerWidth > 1024) {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.unbind(window.actionOficinaEmpleado);
    }
  }
}

window.generateUrlDetail = function () {
  if (window.app && window.innerWidth > 1023) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=(vL_Reto_Seleccionado)'
      }
    }, function (reply) {
      //window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let url = reply.variableValue
        window.waitForElement('.boton-ver-detalle a', function () {
          if (document.querySelectorAll('.boton-ver-detalle a')[0]) {
            document.querySelectorAll('.boton-ver-detalle a')[0].href = url
            document.querySelectorAll('.boton-ver-detalle')[0].classList.remove('d-none')
            window.app.destroySessionObject(reply.qInfo.qId)
          }
        })
      }
      //})
    })
  }
}

window.listenerGenerateUrl = function () {
  if (window.innerWidth > 1024) {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.bind(window.generateUrlDetail);
    }
  }
}

window.destroyListenerGenerateUrl = function () {
  if (window.innerWidth > 1024) {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.unbind(window.generateUrlDetail);
    }
  }
}


window.generateUrlDetailNps = function () {
  if (window.app && window.innerWidth > 1023) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=(vL_URL_detalle)'
      }
    }, function (reply) {
      //window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let url = reply.variableValue
        window.waitForElement('.boton-ver-detalle a', function () {
          if (document.querySelectorAll('.boton-ver-detalle a')[0]) {
            document.querySelectorAll('.boton-ver-detalle a')[0].href = url
            document.querySelectorAll('.boton-ver-detalle')[0].classList.remove('d-none')
            window.app.destroySessionObject(reply.qInfo.qId)
          }
        })
      }
      //})
    })
  }
}

window.listenerGenerateUrlNps = function () {
  if (window.innerWidth > 1024) {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.bind(window.generateUrlDetailNps);
    }
  }
}

window.destroyListenerGenerateUrlNps = function () {
  if (window.innerWidth > 1024) {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.unbind(window.generateUrlDetail);
    }
  }
}

window.setSecurity = function (app) {
  if (app) {
    app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_Selecciones_Activas)'
      }
    }, function (reply) {
      app.destroySessionObject(reply.qInfo.qId).then(function () { });
    }).catch(function (e) {
      window.$eventBus.$on('errorQlik', function (e) {
        if (e.error?.code == 5) {
          window.activePopupSecurity()
        }
      })

    });
  }
}

window.activePopupSecurity = function () {
  if (document.getElementsByClassName('objetos')[0] && !document.getElementsByClassName('objetos')[0].classList.contains('d-none')) {
    document.getElementsByClassName('objetos')[0].classList.add('d-none')
  }
  if (document.getElementsByClassName('qbo-CurrentSelections')[0] && !document.getElementsByClassName('qbo-CurrentSelections')[0].classList.contains('d-none')) {
    document.getElementsByClassName('qbo-CurrentSelections')[0].classList.add('d-none')
  }
  if (document.getElementById('filter-toggle') && !document.getElementById('filter-toggle').classList.contains('d-none')) {
    document.getElementById('filter-toggle').classList.add('d-none')
  }
  if (document.getElementsByClassName('popup-security')[0] && document.getElementsByClassName('popup-security')[0].classList.contains('d-none')) {
    document.getElementsByClassName('popup-security')[0].classList.remove('d-none')
  }

  if (window.innerWidth > 1023) {
    if (document.getElementsByClassName('enlaces-menu')[0] && !document.getElementsByClassName('enlaces-menu')[0].classList.contains('d-none')) {
      document.getElementsByClassName('enlaces-menu')[0].classList.add('d-none')
    }
  }
  else {
    if (window.location.hash.includes('ventasdiarias')) {
      if (document.querySelectorAll('.button-time .button-container')[0] && !document.querySelectorAll('.button-time .button-container')[0].classList.contains('d-none')) {
        document.querySelectorAll('.button-time .button-container')[0].classList.add('d-none')
      }
      if (document.querySelectorAll('.button-time .button-container')[0] && document.querySelectorAll('.button-time .button-container')[0].classList.contains('d-flex')) {
        document.querySelectorAll('.button-time .button-container')[0].classList.remove('d-flex')
      }
      if (document.querySelectorAll('.button-time .button-container')[0] && document.querySelectorAll('.button-time .button-container')[0].classList.contains('button-container')) {
        document.querySelectorAll('.button-time .button-container')[0].classList.remove('button-container')
      }
    }

    if (window.location.hash.includes('ventasdiarias') || window.location.hash.includes('ventashistoricas')) {
      if (document.getElementsByClassName('button-operacion')[0] && !document.getElementsByClassName('button-operacion')[0].classList.contains('d-none')) {
        document.getElementsByClassName('button-operacion')[0].classList.add('d-none')
      }
    }

    if (window.location.hash.includes('ventashistoricas')) {
      if (document.getElementsByClassName('site-header')[0]) {
        document.getElementsByClassName('site-header')[0].style.height = '80px'
      }
    }

    let fixedTabs = document.querySelectorAll('.fixed-tabs .fixed-tab')

    if (fixedTabs.length > 0) {
      for (let i = 0; i < fixedTabs.length; i++) {
        if (!fixedTabs[i].classList.contains('disable-tab')) {
          fixedTabs[i].classList.add('disable-tab')
        }
      }
    }
  }
}

window.disableNavigate = function (values) {
  let elements = []
  let objectClass = ''

  if (window.innerWidth >= 1024) {
    elements = document.querySelectorAll('.link-menu ul li')
    objectClass = 'd-none'

    let contador = 0

    for (let i = 1; i < values.length; i++) {
      if (parseInt(values[i].qText) == 1) {
        if (elements[i - 1] && elements[i - 1].classList.contains(objectClass)) {
          !elements[i - 1].classList.remove(objectClass)
          contador = contador + 1
        }
      }
    }

    let width = 100 / contador

    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].classList.contains('d-none')) {
        elements[i].style.maxWidth = width.toString() + '%'
        elements[i].style.flex = '0 0 ' + width.toString() + '%'
      }
    }

    if (contador > 4) {
      if (document.getElementsByClassName('enlaces-menu')[0] && document.getElementsByClassName('enlaces-menu')[0].classList.contains('col-5')) {
        document.getElementsByClassName('enlaces-menu')[0].classList.remove('col-5')
        document.getElementsByClassName('enlaces-menu')[0].classList.add('col-6')
      }

      if (document.getElementsByClassName('current-selections')[0] && document.getElementsByClassName('current-selections')[0].classList.contains('col-7')) {
        document.getElementsByClassName('current-selections')[0].classList.remove('col-7')
        document.getElementsByClassName('current-selections')[0].classList.add('col-6')
      }
    }
  }
  else {
    elements = document.querySelectorAll('.fixed-tabs .fixed-tab')
    objectClass = 'disable-link'

    if (elements[0] && elements[0].classList.contains(objectClass)) {
      !elements[0].classList.remove(objectClass)
    }

    for (let i = 1; i < values.length; i++) {
      if (parseInt(values[i].qText) == 1) {
        if (elements[i - 1] && elements[i - 1].classList.contains(objectClass)) {
          !elements[i - 1].classList.remove(objectClass)
        }
      }
    }
  }
}

window.setHeightCampana = function () {

  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(#CAMPANA)'
    }
  }, function (reply) {
    Bv

    window.app.destroySessionObject(reply.qInfo.qId).then(function () {

      if (reply.variableValue) {

        setTimeout(function () {

          let elements = document.querySelectorAll('.accioneskpi-content')

          if (elements.length > 0) {

            window.app.createGenericObject({
              variableValue: {
                qStringExpression: '=$(vL_Num_KPI)'
              }
            }, function (reply2) {
              window.app.destroySessionObject(reply2.qInfo.qId).then(function () {

                if (reply2.variableValue) {

                  let height_initial = document.querySelectorAll('.objeto-seguimiento')[0].clientHeight

                  let actual_height = parseInt(reply2.variableValue) * elements[0].clientHeight

                  height_initial = height_initial - 80

                  let kpis = document.querySelectorAll('.card-listkpi .kpis .kpi')

                  if (height_initial > actual_height) {

                    let height = height_initial / parseInt(reply2.variableValue)

                    for (let i = 0; i < elements.length; i++) {
                      elements[i].style.height = height.toString() + 'px'

                      if (kpis[i].classList.contains('border-bottom-none')) {
                        kpis[i].classList.remove('border-bottom-none')
                      }

                      if (i < parseInt(reply2.variableValue)) {
                        if (kpis[i].classList.contains('d-none')) {
                          kpis[i].classList.remove('d-none')
                        }
                        if (i == (parseInt(reply2.variableValue) - 1)) {
                          if (!kpis[i].classList.contains('border-bottom-none')) {
                            kpis[i].classList.add('border-bottom-none')
                          }
                        }
                      }
                      else {
                        if (!kpis[i].classList.contains('d-none')) {
                          kpis[i].classList.add('d-none')
                        }
                      }
                    }
                  }
                  else {
                    for (let i = 0; i < elements.length; i++) {
                      elements[i].style.height = 'initial'

                      if (kpis[i].classList.contains('border-bottom-none')) {
                        kpis[i].classList.remove('border-bottom-none')
                      }

                      if (i < parseInt(reply2.variableValue)) {
                        if (kpis[i].classList.contains('d-none')) {
                          kpis[i].classList.remove('d-none')
                        }
                        if (i == (parseInt(reply2.variableValue) - 1)) {
                          if (!kpis[i].classList.contains('border-bottom-none')) {
                            kpis[i].classList.add('border-bottom-none')
                          }
                        }
                      }
                      else {
                        if (!kpis[i].classList.contains('d-none')) {
                          kpis[i].classList.add('d-none')
                        }
                      }
                    }
                  }
                }
              })
            })
          }
        }, 400);
      }
    })
  });
}

window.listenerCampana = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.setHeightCampana);
  }
}

window.destroyListenerCampana = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.setHeightCampana);
  }
}

//Muestra u oculta el switch intouch y recoloca los objetos según se muestre o no.
window.checkInTouch = function () {

  Array.prototype.forEach.call(document.querySelectorAll('.mobile-version .qlik-basic-object:not(.graph-produccion)'), function (e) {
    e.classList.remove('d-none')
  })

  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_retail_intouch)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {

        if (reply.variableValue == '1') {

          window.app.createGenericObject({
            variableValue: {
              qStringExpression: '=$(vL_selector_retail_intouch_visible)'
            }
          }, function (reply2) {
            window.app.destroySessionObject(reply2.qInfo.qId).then(function () {
              if (reply2.variableValue) {

                let red_selector = document.getElementsByClassName('selector-red')[0]
                let switch_intouch = document.getElementsByClassName('switch-intouch')[0]
                let filter_territorial = document.getElementsByClassName('filter-territorial')[0]
                let top_action_filters = document.getElementsByClassName('top-action-filters')[0]

                if (reply2.variableValue == '1') {

                  if (switch_intouch.classList.contains('d-none')) {
                    switch_intouch.classList.remove('d-none')
                  }
                }

                if (top_action_filters.childElementCount == 0) {
                  top_action_filters.classList.add('d-none')
                  red_selector.classList.remove('col-lg-1')
                  red_selector.classList.add('col-lg-2')
                  filter_territorial.classList.remove('col-3')
                  filter_territorial.classList.add('col-5')
                }

                if (!red_selector) {
                  filter_territorial.classList.remove('col-3')
                  if (window.page === 'citas') {
                    filter_territorial.classList.add('col-3')
                  }
                  else {
                    if (window.getActualPage() != 'muro') {
                      filter_territorial.classList.add('col-4')
                    } else {
                      filter_territorial.classList.add('col-3')
                    }

                  }


                }
              }
            })
          })

          if (document.getElementsByClassName('tipo-oficina')[0] && !document.getElementsByClassName('tipo-oficina')[0].classList.contains('ocultar-tipo-oficina')) {
            document.getElementsByClassName('tipo-oficina')[0].classList.add('ocultar-tipo-oficina')
          }

          if (document.getElementsByClassName('tipo-gestor')[0] && !document.getElementsByClassName('tipo-gestor')[0].classList.contains('ocultar-tipo-gestor')) {
            document.getElementsByClassName('tipo-gestor')[0].classList.add('ocultar-tipo-gestor')
          }

          if (document.getElementsByClassName('top-action')[0] && !document.getElementsByClassName('top-action')[0].classList.contains('top-action-reduce')) {
            document.getElementsByClassName('top-action')[0].classList.add('top-action-reduce')
          }

          if (document.getElementsByClassName('without-intouch')[0] && !document.getElementsByClassName('without-intouch')[0].classList.contains('with-intouch')) {
            document.getElementsByClassName('without-intouch')[0].classList.add('with-intouch')
          }

          window.app.createGenericObject({
            variableValue: {
              qStringExpression: '=$(vL_flag_vision_intouch)'
            }
          }, function (reply) {
            window.app.destroySessionObject(reply.qInfo.qId).then(function () {
              if (reply.variableValue) {
                // Before 1 ?

                if (reply.variableValue == 0) {

                  document.querySelectorAll('.switch-intouch input')[0].checked = true
                  if (document.querySelectorAll('.switch-intouch .toggle-container ul li ')[0] &&
                    document.querySelectorAll('.switch-intouch .toggle-container ul li ')[0].classList.contains('toggle-label-active')) {
                    document.querySelectorAll('.switch-intouch .toggle-container ul li ')[0].classList.remove('toggle-label-active')
                  }

                  if (document.querySelectorAll('.switch-intouch .toggle-container ul li ')[2] &&
                    !document.querySelectorAll('.switch-intouch .toggle-container ul li ')[2].classList.contains('toggle-label-active')) {
                    document.querySelectorAll('.switch-intouch .toggle-container ul li ')[2].classList.add('toggle-label-active')
                  }


                  if (window.innerWidth < 1024) {
                    let indicators = document.querySelectorAll('#carousel-object___BV_indicators_ li')
                    if (indicators.length > 3) {
                      if (indicators[indicators.length - 1].classList.contains('d-none')) {
                        indicators[indicators.length - 1].classList.remove('d-none')
                      }
                    }
                  }

                  // let tabla = document.getElementsByClassName('tabla-pivot')[0]
                  // if (tabla) {
                  //   if (tabla.classList.contains('tabla-retail')) {
                  //     tabla.classList.remove('tabla-retail')
                  //   }
                  //   if (!tabla.classList.contains('tabla-intouch')) {
                  //     tabla.classList.add('tabla-intouch')
                  //   }
                  // }

                }

                // else {
                //   let tabla = document.getElementsByClassName('tabla-pivot')[0]
                //   if (tabla) {
                //     if (tabla.classList.contains('tabla-intouch')) {
                //       tabla.classList.remove('tabla-intouch')
                //     }
                //     if (!tabla.classList.contains('tabla-retail')) {
                //       tabla.classList.add('tabla-retail')
                //     }
                //   }
                // }
              }
            })

          })
        }

        else if (reply.variableValue == '3') {
          if (document.querySelectorAll('.dropdown-filter.tipo-oficina')[0]) {
            if (!document.querySelectorAll('.dropdown-filter.tipo-oficina')[0].classList.contains('d-none')) {
              document.querySelectorAll('.dropdown-filter.tipo-oficina')[0].classList.add('d-none')
            }
          }

          if (document.querySelectorAll('.objeto-vision .nav-tabs li').length == 6) {
            let tabs = document.querySelectorAll('.objeto-vision .nav-tabs li')
            if (!tabs[5].classList.contains('d-none')) {
              tabs[5].classList.add('d-none')
            }

            for (let i = 1; i < tabs.length; i++) {
              if (!tabs[i].classList.contains('resize-nav-item')) {
                tabs[i].classList.add('resize-nav-item')
              }
            }
          }

          if (window.innerWidth < 1024) {
            if (document.querySelectorAll('.carousel-indicators li').length > 0) {
              if (!document.querySelectorAll('.carousel-indicators li')[document.querySelectorAll('.carousel-indicators li').length - 1].classList.contains('d-none')) {
                document.querySelectorAll('.carousel-indicators li')[document.querySelectorAll('.carousel-indicators li').length - 1].classList.add('d-none')
              }
            }
          }

          if (!document.querySelectorAll('.sidebar-right .qbo-UPLJemM')[0].classList.contains('d-none')) {
            document.querySelectorAll('.sidebar-right .qbo-UPLJemM')[0].classList.add('d-none')
          }
        }
      }
    })
  })
}

window.modifyInTouch = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=Only(#FLAG_INTOUCH)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == 'Visión Retail') {
          window.setFilterByValue('#FLAG_INTOUCH', 'Visión inTouch')
          localStorage.setItem('intouch', 'Visión inTouch')

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0] &&
            document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0].classList.contains('toggle-label-active')) {
          }

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2] &&
            !document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2].classList.contains('toggle-label-active')) {
          }
        }
        else {
          window.setFilterByValue('#FLAG_INTOUCH', 'Visión Retail')
          localStorage.setItem('intouch', 'Visión Retail')
          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0] &&
            !document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0].classList.contains('toggle-label-active')) {
          }

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2] &&
            document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2].classList.contains('toggle-label-active')) {
          }
        }

        window.modifyPivotTableClass()
      }
    })
  })
}

window.modifyPivotTableClass = function () {
  let tabla = document.getElementsByClassName('tabla-pivot')[0]
  if (tabla) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=Only(#FLAG_INTOUCH)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          if (reply.variableValue == 'Visión Retail') {
            if (tabla.classList.contains('tabla-intouch')) {
              tabla.classList.remove('tabla-intouch')
            }
            if (!tabla.classList.contains('tabla-retail')) {
              tabla.classList.add('tabla-retail')
            }
          }
          else {
            if (tabla.classList.contains('tabla-retail')) {
              tabla.classList.remove('tabla-retail')
            }
            if (!tabla.classList.contains('tabla-intouch')) {
              tabla.classList.add('tabla-intouch')
            }
          }
        }
      })
    })
  }

}


window.modifyInTouchAnalitica = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=Only(#FLAG_INTOUCH)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == 'Visión Retail') {
          window.setFilterByValue('#FLAG_INTOUCH', 'Visión inTouch')
          localStorage.setItem('intouch', 'Visión inTouch')

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0] &&
            document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0].classList.contains('toggle-label-active')) {
          }

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2] &&
            !document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2].classList.contains('toggle-label-active')) {
          }
        }
        else {
          window.setFilterByValue('#FLAG_INTOUCH', 'Visión Retail')
          localStorage.setItem('intouch', 'Visión Retail')
          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0] &&
            !document.querySelectorAll('.switch-intouch .toggle-container ul li label')[0].classList.contains('toggle-label-active')) {
          }

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2] &&
            document.querySelectorAll('.switch-intouch .toggle-container ul li label')[2].classList.contains('toggle-label-active')) {
          }
        }
        window.modifyPivotTableClass()
      }
    })
  })
}

window.mostrarEstructura = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_acciones_estructura)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == '2') {
          if (document.getElementsByClassName('segunda-estructura').length > 0) {
            window.showSelector()
          }
        }

        let elements = document.querySelectorAll('#selectCampanaFilter option')

        for (let i = 0; i < elements.length; i++) {
          if (elements[i].innerText == localStorage.getItem('filterCampana')) {
            document.querySelectorAll('#selectCampanaFilter')[0].selectedIndex = i;
            break
          }
        }

        window.actualQlik.resize()
      }
    })
  })
}
window.listenerEstructura = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.mostrarEstructura);
  }
}
window.destroyListenerEstructura = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.mostrarEstructura);
  }
}

//Muestra el selector seguimiento y recoloca el selector op-importe
window.showSelector = function () {
  window.app.createGenericObject({
    selectorActivo: {
      qStringExpression: '=$(vL_selector_activo)'
    }
  }, function (reply) {
    if (reply.selectorActivo) {
      if (reply.selectorActivo == 1) {
        if (document.getElementsByClassName('selector-seguimiento')[0]) {
          document.getElementsByClassName('selector-seguimiento')[0].classList.remove('d-none')
        }
        if (document.querySelectorAll('.segunda-estructura .op-importe')[0]) {
          document.querySelectorAll('.segunda-estructura .op-importe')[0].classList.remove('offset-3')
        }
      }
    }
  })
}

window.actionListenerIntouchAC = function () {
  window.app.createGenericObject({
    selectorActivo: {
      qStringExpression: '=$(vL_flag_vision_intouch)'
    }
  }, function (reply) {
    if (reply.selectorActivo) {

      setTimeout(function () {
        if (reply.selectorActivo == 1) {
          // if (window.innerWidth > 1023) {
          //   let element = document.querySelectorAll('.vision-jerarquica-pc ul li')[3]
          //   if (element) {
          //     if (element.classList.contains('d-none')) {
          //       element.classList.remove('d-none')
          //     }
          //   }
          // }
        }
        else if (reply.selectorActivo == 0) {
          if (window.innerWidth > 1023) {
            let element = document.querySelectorAll('.vision-jerarquica-pc ul li')[3]
            if (element) {
              if (element.getElementsByTagName('a')[0] && element.getElementsByTagName('a')[0].classList.contains('active')) {
                if (document.querySelectorAll('.vision-jerarquica-pc ul li a')[0]) {
                  document.querySelectorAll('.vision-jerarquica-pc ul li a')[0].click()
                }
              }
              // if (!element.classList.contains('d-none')) {
              //   element.classList.add('d-none')
              // }
            }
          }
        }
      }, 500);
    }
  })
}
window.listenerIntouchAC = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerIntouchAC);
  }
}
window.destroyListenerIntouchAC = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerIntouchAC);
  }
}


window.actionListenerIntouchVentas = function () {
  window.app.createGenericObject({
    selectorActivo: {
      qStringExpression: '=$(vL_flag_vision_intouch)'
    }
  }, function (reply) {
    if (reply.selectorActivo) {

      setTimeout(function () {
        if (reply.selectorActivo == 1) {
          if (window.innerWidth > 1023) {
            let element = document.querySelectorAll('.vision-jerarquica-pc ul li')[6]
            if (element) {
              if (element.classList.contains('d-none')) {
                element.classList.remove('d-none')
              }
            }
          }
        }
        else if (reply.selectorActivo == 0) {
          if (window.innerWidth > 1023) {
            let element = document.querySelectorAll('.vision-jerarquica-pc ul li')[6]
            if (element) {
              if (element.getElementsByTagName('a')[0] && element.getElementsByTagName('a')[0].classList.contains('active')) {
                if (document.querySelectorAll('.vision-jerarquica-pc ul li a')[0]) {
                  document.querySelectorAll('.vision-jerarquica-pc ul li a')[0].click()
                }
              }
              if (!element.classList.contains('d-none')) {
                element.classList.add('d-none')
              }
            }
          }
        }
      }, 500);
    }
  })
}
window.listenerIntouchVentas = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerIntouchVentas);
  }
}
window.destroyListenerIntouchVentas = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerIntouchVentas);
  }
}

//Setea en el filtro #CAMPANA el valor de localStorage filterCampana en la vista accionescomerciales y si no existe navega de nuevo a la vista campana.
window.setFilterCampana = function () {
  if (window.location.href.includes('acciones')) {
    let filter = localStorage.getItem('filterCampana')
    if (filter) {
      window.setFilterByValue('#CAMPANA', filter)
    }
    else {
      window.navigatePage('#/campana?_page=application/pages_acciones.json')
    }
  } else if (window.location.href.includes('informes') && !window.location.href.includes('informesistematica')) {
    let filter = localStorage.getItem('filterCampana')
    if (filter) {
      window.setFilterByValue('#INFORME', filter)
    }
    else {
      window.navigatePage('#/campanaInformes?_page=application/pages_informes.json')
    }
  }

}

//Accion de listenerFilterCampana que setea en el filtro #CAMPANA el valor de localStorage si no hay nada seleccionado y si no hay nada en localSotrage, navega a la vista de campana.
window.actionFilterCampana = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(#CAMPANA)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let value = ''
        if (reply.variableValue == '-') {
          if (localStorage.getItem('filterCampana')) {
            value = localStorage.getItem('filterCampana')

            if (document.getElementById('selectCampanaFilter').value != value) {
              document.getElementById('selectCampanaFilter').value = value
            }

            window.canBeSelected('#CAMPANA', value).then(reply => {
              if(reply){
                window.setFilterByValue('#CAMPANA', value)
              }else{
                window.selectFirstOptionPosible('#CAMPANA')
              }
            }) 

            window.setHeightCampana()
          }
          else {
            window.navigatePage('#/campana?_page=application/pages_acciones.json')
          }
        }
      }
    })
  });
}
//Creacion listener filtro #CAMPANA en accionescomerciales
window.listenerFilterCampana = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionFilterCampana);
  }
}
//Destruccion listener filtro #CAMPANA en accionescomerciales
window.destroyListenerFilterCampana = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionFilterCampana);
  }
}

//Accion listenerOficinaNegocio que comprueba el valor de vL_flag_oficina_negocio y oculta o muestra filtros en el menu lateral
window.actionListenerOficinaNegocio = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_flag_oficina_negocio)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == '0') {
          if (document.querySelectorAll('.sidebar-right .qbo-Atsaf')[0] && !document.querySelectorAll('.sidebar-right .qbo-Atsaf')[0].classList.contains('d-none')) {
            document.querySelectorAll('.sidebar-right .qbo-Atsaf')[0].classList.add('d-none')
          }
          if (document.querySelectorAll('.sidebar-right .qbo-TKrGT')[0] && !document.querySelectorAll('.sidebar-right .qbo-TKrGT')[0].classList.contains('d-none')) {
            document.querySelectorAll('.sidebar-right .qbo-TKrGT')[0].classList.add('d-none')
          }
        }
        else {
          if (document.querySelectorAll('.sidebar-right .qbo-Atsaf')[0] && document.querySelectorAll('.sidebar-right .qbo-Atsaf')[0].classList.contains('d-none')) {
            document.querySelectorAll('.sidebar-right .qbo-Atsaf')[0].classList.remove('d-none')
          }
          if (document.querySelectorAll('.sidebar-right .qbo-TKrGT')[0] && document.querySelectorAll('.sidebar-right .qbo-TKrGT')[0].classList.contains('d-none')) {
            document.querySelectorAll('.sidebar-right .qbo-TKrGT')[0].classList.remove('d-none')
          }
        }
      }
    })
  });
}
//Creacion listener de la variable vL_flag_oficina_negocio en nps
window.listenerOficinaNegocio = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerOficinaNegocio);
  }
}
//Destruccion listener de la variable vL_flag_oficina_negocio en nps
window.destroyListenerOficinaNegocio = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerOficinaNegocio);
  }
}

//Accion listenerFilterVisionProducto que setea en el filtro #VISION_PRODUCTO el valor guardado en localStorage si el filtro no tiene valor
window.actionFilterVisionProducto = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(#VISION_PRODUCTO)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let value = ''
        if (reply.variableValue == '-') {
          if (localStorage.getItem('visionProducto')) {
            value = localStorage.getItem('visionProducto')
            window.setFilterByValue('#VISION_PRODUCTO', value)
          }
        }
      }
    })
  });
}

//Creacion listener filtro #VISION_PRODUCTO en la vista campaña
window.listenerFilterVisionProducto = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionFilterVisionProducto);
  }
}

//Destruccion listener filtro #VISION_PRODUCTO en la vista campaña
window.destroyListenerFilterVisionProducto = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionFilterVisionProducto);
  }
}

//Cambia la variable #FLAG_RECURRENCIA y cambia el estado del selector
window.changeRecurrencia = function (value) {
  // window.setFilterByValue('#FLAG_RECURRENCIA',value)
  let active = document.querySelectorAll('.selector-recurrencia .active')
  if (active && active.length > 0) {
    active[0].classList.remove('active')
  }

  window.waitForElement('.selector-recurrencia .' + value, function () {
    document.querySelectorAll('.selector-recurrencia .' + value)[0].classList.add('active')
  })


  if (value == 'anual') {
    window.retosRecurrencia = false
    localStorage.setItem('retosRecurrencia', 0)
    window.setFilterByValue('#FLAG_RECURRENCIA', 'Anual')
  }
  else {
    window.retosRecurrencia = true
    localStorage.setItem('retosRecurrencia', 1)
    window.setFilterByValue('#FLAG_RECURRENCIA', 'Recurrencias')
  }
}

//Comprueba el valor de #FLAG_RECURRENCIA y cambia el valor del botón
window.checkRecurrencia = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '#FLAG_RECURRENCIA'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == 'Recurrencias') {
          window.changeRecurrencia('recurrencias')
          localStorage.setItem('retosRecurrencia', 1)
        }
        else {
          window.changeRecurrencia('anual')
          localStorage.setItem('retosRecurrencia', 0)
        }
      }
    })
  });
}

//Accion listenerFecha modificando el selector de Tiempo en ventashistoricas
window.actionListenerFecha = function () {
  let selecciones = window.selState.selections
  let contador = 0
  let contador_tiempo = 0

  for (let i = 0; i < selecciones.length; i++) {
    if (selecciones[i].fieldName == 'Fecha') {
      localStorage.setItem('fecha-active', '1')
      contador = 1
      break
    }
  }

  if (contador == 0) {
    if (localStorage.getItem('fecha-active') == '1') {
      localStorage.removeItem('fecha-active')

      for (let i = 0; i < selecciones.length; i++) {
        if (selecciones[i].fieldName == '#SELECTOR_TIEMPO') {
          document.getElementById('tiempoHistorico').value = selecciones[i].qSelected
          document.getElementsByClassName('disabled-option')[0].innerText = ''
          contador_tiempo = 0
          break
        }
        else {
          contador_tiempo = 1
        }
      }

      if (contador_tiempo == 1) {
        document.getElementById('tiempoHistorico').value = 'Mes Actual'
        document.getElementsByClassName('disabled-option')[0].innerText = ''
        // window.changeTiempoHistorico("pc-version")
      }
    }
    else {
      let checkFecha = 0
      for (let i = 0; i < window.selState.selections.length; i++) {
        if (window.selState.selections[i].fieldName == '#SELECTOR_TIEMPO') {
          checkFecha = 1
        }
      }
      if (checkFecha == 0) {
        document.getElementById('tiempoHistorico').value = 'Mes Actual'
        document.getElementsByClassName('disabled-option')[0].innerText = ''
        // window.changeTiempoHistorico("pc-version")
      }
    }
  }
}
//Creacion listener filtro Fecha en ventashistoricas
window.listenerFecha = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerFecha);
  }
}
//Destruccion listener filtro Fecha en ventadiarias
window.destroyListenerFecha = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerFecha);
  }
}

//Cambiar entre grafica y mapa en ventasdiarias, ventashistoricas y catalogocompleto

window.changeGraficaMapa = function (front, back) {
  let mostrar = document.querySelectorAll('.' + front)
  let ocultar = document.querySelectorAll('.' + back)

  if (mostrar.length > 0 && ocultar.length > 0) {
    if (mostrar[0].classList.contains('d-none')) {
      mostrar[0].classList.remove('d-none')
      ocultar[0].classList.add('d-none')
      document.getElementsByClassName('mapaPc') ? document.getElementsByClassName('mapaPc')[0].classList.remove('mapaPcNoZIndex') : ''
      window.$eventBus.$emit('hideMap')
    }
    else {
      mostrar[0].classList.add('d-none')
      ocultar[0].classList.remove('d-none')
      document.getElementsByClassName('mapaPc') ? document.getElementsByClassName('mapaPc')[0].classList.add('mapaPcNoZIndex') : ''
      window.$eventBus.$emit('reloadMap')
    }
    window.actualQlik.resize()

  }
}

//Mostrar ocultar switch grafica mapa en ventasdiarias, ventashistoricas y catalogocompleto
window.showHideSwitchMapaGrafica = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=(vL_Flag_Mapa)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == '1') {
          Array.prototype.forEach.call(document.getElementsByClassName('switch-mapa-grafica'), function (el) { el.classList.remove('d-none') });
          Array.prototype.forEach.call(document.getElementsByClassName('cardMapMobile'), function (el) { el.classList.remove('d-none') });
        } else {
          Array.prototype.forEach.call(document.getElementsByClassName('switch-mapa-grafica'), function (el) { el.classList.add('d-none') });
          Array.prototype.forEach.call(document.getElementsByClassName('cardMapMobile'), function (el) { el.classList.add('d-none') });

        }
      }
    })
  });
  window.actualQlik.resize()
}

// window.listenerSetCheckValueKpiCampana = function () {
//   if (window.app) {
//     window.selState = window.app.selectionState();
//     window.selState.OnData.bind(window.setCheckValueKpiCampana);
//   }
// }
// window.destroySetCheckValueKpiCampana = function () {
//   if (window.app) {
//     window.selState = window.app.selectionState();
//     window.selState.OnData.unbind(window.setCheckValueKpiCampana);
//   }
// }

//Campañas a mostrar en Acciones Comerciales - campana
window.showCampana = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_tipo_campana_mostrada)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (window.innerWidth >= 1024) {
          window.waitForElement('.check .container input', () => {
            let campana = reply.variableValue;
            if (campana == '1') {
              document.getElementById("cbox1").checked = true;
              document.getElementById("cbox2").checked = false;
              document.getElementById("cbox3").checked = false;
            }
            else if (campana == '2') {
              document.getElementById("cbox1").checked = false;
              document.getElementById("cbox2").checked = false;
              document.getElementById("cbox3").checked = true;
            }
            else if (campana == '3') {
              document.getElementById("cbox1").checked = false;
              document.getElementById("cbox2").checked = true;
              document.getElementById("cbox3").checked = false;
            }
            window.setCheckValueKpiCampana();
          })
        } else{
          window.waitForElement('.check-mobile .button-group', () => {
            let campana = reply.variableValue;
            if (campana == '1') {
              window.setButtonValueKpiCampana('button1', 'Destacadas')
            }
            else if (campana == '2') {
              window.setButtonValueKpiCampana('button2', 'Histórico anual')
            }
            else if (campana == '3') {
              window.setButtonValueKpiCampana('button3', 'Anuales')
            }
          })
        }
        
      }
    })
  })
}

window.setCheckValueKpiCampana = function () {

  if (window.innerWidth >= 1024) {
    let arrayValuesCheck = []
    let inputsChecks = document.querySelectorAll('.accionescomerciales .check label input')
    for (let i = 0; i < inputsChecks.length; i++) {
      if (inputsChecks[i].checked) {
        arrayValuesCheck.push(inputsChecks[i].value)
      }
    }

    if (arrayValuesCheck) {
        window.app.field("[#TIPO_CAMPANA]").clear().then(() => {
          window.setFilterByMultipleValues('#TIPO_CAMPANA', arrayValuesCheck)
        })

    }

  }

}

window.array = []
window.setButtonValueKpiCampana = function (nameClass, tipo) {
  if (window.innerWidth <= 1023) {

    if (document.querySelectorAll('.accionescomerciales .check-mobile .button-group div.' + nameClass)[0]) {
      if (document.querySelectorAll('.accionescomerciales .check-mobile .button-group div.' + nameClass)[0].classList.contains('active')) {
        document.querySelectorAll('.accionescomerciales .check-mobile .button-group div.' + nameClass)[0].classList.remove('active')
      } else { 
        document.querySelectorAll('.accionescomerciales .check-mobile .button-group div.' + nameClass)[0].classList.add('active')
      }
    }


    if (!window.array.includes(tipo)) {
      window.array.push(tipo)
    } else {
      let arrayAux = window.array
      for (let i = 0; i < window.array.length; i++) {
        if (window.array[i] == tipo) {
          arrayAux.splice(i, 1)
          break;
        }
      }

      window.array = arrayAux
    }

    if(window.array){
      window.app.field("[#TIPO_CAMPANA]").clear().then(()=>{
        window.setFilterByMultipleValues('#TIPO_CAMPANA', window.array)
      })
    }

  

    
    
  }

}


window.actionCheckAcciones = function () {
  let array = window.app.selectionState().selections
  let buttonsCheck = []
  let flag = false

  for (let i = 0; i < array.length; i++) {
    if (array[i].fieldName == "#TIPO_CAMPANA") {
      flag = true
      localStorage.setItem('checkAcciones', array[i].qSelected)
    }
  }

  if (!flag) {
    let selections = []
    if (window.innerWidth >= 1024) {
      buttonsCheck = document.querySelectorAll('.accionescomerciales .top-action .check .container input:checked')
      selections = Array.from(buttonsCheck).map(b => b.value)

      if (selections.length > 0) {
        window.setFilterByMultipleValues('#TIPO_CAMPANA', selections)
      }

    } else {
      buttonsCheck = document.querySelectorAll('.accionescomerciales .check-mobile .button-group div.active')
      selections = Array.from(buttonsCheck).map(b => b.getAttribute('value'))

      if (selections.length > 0) {
        window.setFilterByMultipleValues('#TIPO_CAMPANA', selections)
      }
    }


    



    // for (let i = 0; i < buttonsCheck.length; i++) {


    //     if(selections.indexOf(buttonsCheck[i].value) != -1 ){
    //       buttonsCheck[i].checked = false
    //     }
    // }
  }
}

window.listenerCheckAcciones = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionCheckAcciones);
  }
}

window.destroyListenerCheckAcciones = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionCheckAcciones);
  }
}


window.listenerCheckAccionesAvailable = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionCheckAccionesAvailable);
  }
}

window.destroyListenerCheckAccionesAvailable = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionCheckAccionesAvailable);
  }
}

window.actionCheckAccionesAvailable = function(){
  if (window.innerWidth >= 1024) {
    let inputsChecks = document.querySelectorAll('.accionescomerciales .check label input')

    let avaibleChecks = []

    window.app.createList(window.cubeDefinition('#TIPO_CAMPANA'), function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId);
  
      if (reply.qListObject.qDataPages.length > 0) {
        let elements = reply.qListObject.qDataPages[0].qMatrix
        for (let i = 0; i < elements.length; i++) {
          if(elements[i][0].qState !== 'X'){
            avaibleChecks.push(elements[i][0].qText)
          }
        }
      }
    }).then(()=>{
      for(let e of inputsChecks){
        if(avaibleChecks.indexOf(e.value) == -1){
          e.parentElement.classList.add('disable-check')
          e.remove()
        }
      }

    })




  } else {
    let inputsChecks = document.querySelectorAll('.accionescomerciales .check-mobile .button-group div')

    let avaibleChecks = []

    window.app.createList(window.cubeDefinition('#TIPO_CAMPANA'), function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId);
  
      if (reply.qListObject.qDataPages.length > 0) {
        let elements = reply.qListObject.qDataPages[0].qMatrix
        for (let i = 0; i < elements.length; i++) {
          if(elements[i][0].qState !== 'X'){
            avaibleChecks.push(elements[i][0].qText)
          }
        }
      }
    }).then(()=>{
      for(let e of inputsChecks){
        if(avaibleChecks.indexOf(e.getAttribute('value')) == -1){
          e.classList.add('disable-button')
        }
      }

    })




  }
  
}



window.actionFilterRed = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_selector_red_visible)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        let elements = document.querySelectorAll('.sidebar-right .qbo-' + window.idRed)
        if (elements.length > 0) {
          if (reply.variableValue != 1) {
            if (!elements[0].classList.contains('d-none')) {
              elements[0].classList.add('d-none')
            }
          }
          else {
            if (elements[0].classList.contains('d-none')) {
              elements[0].classList.remove('d-none')
            }
          }
        }
      }
    })
  })
}

window.listenerFilterRed = function (idRed) {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.idRed = idRed
    window.selState.OnData.bind(window.actionFilterRed);
  }
}

window.destroyListenerFilterRed = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionFilterRed);
  }
}





//Redirect de PRO a NRT
window.deleteQlikTicket()
window.redirectNrt()

window.navigateRetos = function () {
  let flag = localStorage.getItem('back');
  localStorage.setItem('isGoingBack', 1)
  let url = ''
  if (flag) {
    if (flag == 'Retos Comerciales') {
      url = '/retos?_page=application/pages_retos.json'
    } else if (flag == 'Aportación Segmentos') {
      url = '/aportacionsegmentos?_page=application/pages_retos.json'
    } else {
      url = '/retosnocomerciales?_page=application/pages_retos.json'
    }
  }
  window.$viewInstanceVue.$router.push({ path: url })
}

window.sendNameAppLocalStorage = function () {
  if (window.page == 'ventasdiarias') {
    localStorage.setItem('nameAppVisionDetalle', 'Ventas Diarias')
  }
  if (window.page == 'ventashistoricas') {
    localStorage.setItem('nameAppVisionDetalle', 'Ventas Históricas')
  }
  if (window.page == 'catalogocompleto') {
    localStorage.setItem('nameAppVisionDetalle', 'Catálogo completo')
  }
  if (window.page == 'accionescomerciales') {
    localStorage.setItem('nameAppVisionDetalle', 'Acciones Comerciales')
  }  
}

window.setNameTitle = function () {
  let nameApp = localStorage.getItem('nameAppVisionDetalle')
  if (document.querySelectorAll('.title-page')[1]) {
    document.querySelectorAll('.title-page')[1].innerHTML = nameApp
  }
}

window.detalleBackPage = function () {
  let actualPage = localStorage.getItem('nameAppVisionDetalle')
  localStorage.setItem('previousPage', 'visiondetalle')

  localStorage.setItem('previousPageIndicador', 'visiondetalle')
  localStorage.setItem('previousPageRatio', 'visiondetalle')
  localStorage.setItem('previousPageTiempo', 'visiondetalle')

  if (actualPage == 'Ventas Históricas') {
    localStorage.setItem('previousPageTipoVenta', 'visiondetalle')
    window.$viewInstanceVue.$router.push({ path: '/ventashistoricas?_page=application/pages_ventashistoricas.json' })
  }
  else if (actualPage == 'Ventas Diarias') {
    window.$viewInstanceVue.$router.push({ path: '/ventasdiarias?_page=application/pages_ventasdiarias.json' })
  }
  else if (actualPage == 'Catálogo completo') {
    localStorage.setItem('previousPageTipoVenta', 'visiondetalle')
    window.$viewInstanceVue.$router.push({ path: '/catalogocompleto?_page=application/pages_catalogocompleto.json' })
  }
  else if (actualPage == 'Acciones Comerciales') {
    window.$viewInstanceVue.$router.push({ path: '/accionescomerciales?_page=application/pages_acciones.json' })
  }

}


//Setea los filtros de OP_IMPORTE al volver de la vista de detalle
window.setFilterIndicador = function () {
  if (!localStorage.getItem('previousPageIndicador') || localStorage.getItem('previousPageIndicador') != 'visiondetalle') {
    window.setFilterByValue('#OP_IMPORTE', 'Operaciones')
  }
  else {
    localStorage.removeItem('previousPageIndicador')

    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '#OP_IMPORTE'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue && reply.variableValue != '-') {
          document.getElementById('op_importe').value = reply.variableValue
        }
      })
    })
  }
}

//Setea los filtros de CANCELACIONES_VENTAS al volver de la vista de detalle
window.setFilterTipoVenta = function () {
  if (!localStorage.getItem('previousPageTipoVenta') || localStorage.getItem('previousPageTipoVenta') != 'visiondetalle') {
    window.setFilterByValue('#CANCELACIONES_VENTAS', 'Brutas')
  }
  else {
    localStorage.removeItem('previousPageTipoVenta')

    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '#CANCELACIONES_VENTAS'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue && reply.variableValue != '-') {
          document.getElementById('cancelaciones_ventas').value = reply.variableValue
        }
      })
    })

  }
}

//Setea los filtros de TOTALES_RATIO al volver de la vista de detalle
window.setFilterRatio = function () {
  if (!localStorage.getItem('previousPageRatio') || localStorage.getItem('previousPageRatio') != 'visiondetalle') {
    window.setFilterByValue('=[#TOTALES_RATIO]', 'Total')
  }
  else {
    localStorage.removeItem('previousPageRatio')

    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=[#TOTALES_RATIO]'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue && reply.variableValue != '-') {
          document.getElementById('ratio').value = reply.variableValue
        }
      })
    })

  }
}

// //Setea los filtros de SELECTOR_TIEMPO al volver de la vista de detalle
// window.setFilterTime = function () {
//   if (!localStorage.getItem('previousPageTiempo') || localStorage.getItem('previousPageTiempo') != 'visiondetalle') {
//     window.setFilterByValue('#SELECTOR_TIEMPO', 'Mes Actual')
//   }
//   else {
//     localStorage.removeItem('previousPageTiempo')

//     window.app.createGenericObject({
//       variableValue: {
//         qStringExpression: '#SELECTOR_TIEMPO'
//       }
//     }, function (reply) {
//       window.app.destroySessionObject(reply.qInfo.qId).then(function () {
//         if (reply.variableValue && reply.variableValue != '-') {
//           document.getElementById('tiempoHistorico').value = reply.variableValue
//         }
//       })
//     })

//   }
// }



window.setTimeVentaDiaria = function () {
  if (localStorage.getItem('previousPage') && localStorage.getItem('previousPage') == 'visiondetalle') {
    localStorage.removeItem('previousPage')

    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '#HOY_SEMANA'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          document.getElementById('tiempo').value = reply.variableValue
        }
      })
    })
  }
}

window.setTitleRetos = function () {
  let name = localStorage.getItem('back')
  if (name && document.getElementsByClassName('title-page')[0]) {
    document.getElementsByClassName('title-page')[0].innerHTML = name
  }

  let childs_retos = document.querySelectorAll('.enlaces-menu .background-childs')[0].getElementsByTagName('a')

  for (let i = 0; i < childs_retos.length; i++) {
    childs_retos[i].classList.remove('active-link-child')
  }

  if (name == 'Retos Comerciales') {
    childs_retos[0].classList.add('active-link-child')
  } else {
    childs_retos[1].classList.add('active-link-child')
  }

}


// PIVOT TABLE ACCIONES COMERCIALES
//  ################################

// Listener
window.listenerLoadTable = function () {

  // Listen for 'loadedObject' event emmited by a BasicObject
  window.$eventBus.$on('loadedObject', function (element) {

    // Only react to specific element id.
    if (element.id == 'fztBQ') {

      // Wait for object to load correctly.
      setTimeout(function () {

        // Logging

        // Execute actions.
        const icon = document.querySelector('.header.top.parent i')

        // Click icon.
        // icon.click()


      }, 1000);
    }

  })

}

// Destroy Listener
window.destroyListenerLoadTable = function () {

}



window.clearFiltersResumenAnaliticoAC = function () {
  window.selState = window.app.selectionState();
  for (let i = 0; i < window.selState.selections.length; i++) {
    if (window.selState.selections[i].fieldName != '#CAMPANA') {
      window.app.field(window.selState.selections[i].fieldName).clear()
    }
  }
}
window.clearFiltersResumenAnaliticoRetos = function () {
  window.selState = window.app.selectionState();
  for (let i = 0; i < window.selState.selections.length; i++) {
    if (window.selState.selections[i].fieldName != '#Seguimiento') {
      window.app.field(window.selState.selections[i].fieldName).clear()
    }
  }
}

window.changeActiveTab = function (index) {
  const componentList = document.querySelectorAll('.produccion-negocio-oficina-canal .nav-tabs, .dynamic-tabs .nav-tabs')[0].children
  for (let i = 0; i < componentList.length; i++) {
    if (i == index) {
      componentList[i].classList.add('tab-icon-title')
    } else {
      componentList[i].classList.remove('tab-icon-title')
    }
  }
}

window.changeEvolucionDiariaTab = function (index) {
  const tabList = document.querySelectorAll('.evolucion-selector-tabs .nav-link')
  tabList.forEach((tab, i) => {
    tab.classList.toggle('active', i === index)
  })
}

window.switchMuro = function (page) {
  if (page == 'muro') {
    window.$viewInstanceVue.$router.push({ path: '/muro?_page=application/pages_muro.json' })
  }
  else if (page == 'whatsappmuro') {
    window.$viewInstanceVue.$router.push({ path: '/whatsappmuro?_page=application/pages_muro.json' })
  }
}


//Borrado de todos los filtros menos el de tiempo
window.listenerClearAll = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.keepFilterTiempo);
  }

}

window.destroyListenerClearAll = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.keepFilterTiempo);
  }

}

window.cubeDefinition = function (fieldName) {
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
}

window.checkIfFilterIsValid = async function (value, filter) {
  let valid =  false
  
  await window.app.createList(window.cubeDefinition(filter), function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId);

    if (reply.qListObject.qDataPages.length > 0) {
      let elements = reply.qListObject.qDataPages[0].qMatrix
      for (let i = 0; i < elements.length; i++) {
        if (elements[i][0].qText == value) {
          if (elements[i][0].qState != 'X') {
            valid = true
          }
          else {
            valid = false
          }
          break
        }
      }
    }
  });
  
  return valid
}

window.switchCitas = function (page) {
  if (page == 'citas') {
    window.$viewInstanceVue.$router.push({ path: '/citas?_page=application/pages_citas.json' })
  }
  else if (page == 'planificadas') {
    window.$viewInstanceVue.$router.push({ path: '/detallecitas?_page=application/pages_citas.json' })
  }
}


window.switchSegmentos = function (page) {
  if (page == 'principal') {
    window.$viewInstanceVue.$router.push({ path: '/cuadromandosegmentos?_page=application/pages_cuadromandosegmentos.json' })
  }
  else if (page == 'evolucion') {
    window.$viewInstanceVue.$router.push({ path: '/evolucionsegmentos?_page=application/pages_cuadromandosegmentos.json' })
  }
}

window.switchNegocios = function (page) { 
  if (page == 'principal') {
    window.$viewInstanceVue.$router.push({ path: '/cuadromandonegocios?_page=application%2Fpages_cuadromandonegocios.json' })
  }
  else if (page == 'evolucion') {
    window.$viewInstanceVue.$router.push({ path: '/evolucionnegocios?_page=application/pages_cuadromandonegocios.json' }) 
  }
}

window.keepFilterTiempo = function () {
  let localStorageVariable
  let filter
  if (window.location.href.includes('muro')) {
    localStorageVariable = localStorage.getItem('tiempoMuro')
    filter = '#SELECTOR_TIEMPO_M'
    //window.app.field("[#SELECTOR_TIEMPO]").clear()
  } else if (window.location.href.includes('#/citas') || window.location.href.includes('#/detallecitas')) {
    localStorageVariable = localStorage.getItem('tiempoCitas')
    filter = '#SELECTOR_TIEMPO'
    //window.app.field("[#SELECTOR_TIEMPO_M]").clear()
  } else if (window.location.href.includes('#/meeter')) {
    localStorageVariable = localStorage.getItem('fechaStorage')
    filter = '#SELECTOR_TIEMPO'
    //window.app.field("[#SELECTOR_TIEMPO_M]").clear()
  }
  let selecciones = window.app.selectionState().selections
  let tiempoFound = false
  for (let i = 0; i < selecciones.length; i++) {
    if (selecciones[i].fieldName == filter) {
      tiempoFound = true
      break
    }

    if (selecciones[i].fieldName == 'Fecha') {
      tiempoFound = true
    }
  }
  if (!tiempoFound && localStorageVariable) {
    if (window.checkIfFilterIsValid(localStorageVariable, filter)) {
      window.setFilterByValue(filter, localStorageVariable)
    }

  }

}


window.actionListenerTiempo = function () {
  let selecciones = window.app.selectionState().selections
  let tiempoFound = false
  for (let i = 0; i < selecciones.length; i++) {
    if (selecciones[i].fieldName == '#SELECTOR_TIEMPO') {
      localStorage.setItem('selectorTiempo', selecciones[i].qSelected) // Celda de localstorage con un nombrereusable
      tiempoFound = true
      break
    }

    if (selecciones[i].fieldName == 'Fecha') {
      tiempoFound = true
    }
  }
  if (!tiempoFound) {
    window.setFilterByValue('#SELECTOR_TIEMPO', localStorage.getItem('selectorTiempo'))
  }
}




window.setSemanaActualAsDefault = function () {
  window.app.field('[#SELECTOR_TIEMPO_M]').clear()
  if (window.location.href.includes('#/citas') && localStorage.getItem('NavigationCitas') == 1) {
    localStorage.setItem('tiempoCitas', 'Semana Actual')
    localStorage.setItem('tiempoMuro', 'Semana Actual')
    window.changeDropdownTiempo()
    window.setFilterByValue('#SELECTOR_TIEMPO', 'Semana Actual')
    window.setFilterByValue('#TOTALES_RATIO', 'Total')
    localStorage.setItem('NavigationCitas', 2)
    localStorage.setItem('NavigationMuro', 1)
  }
}

window.setDefaultTimeMuro = function () {
  window.app.field('[#SELECTOR_TIEMPO]').clear()
  let anterior
  if (window.location.href.includes('#/muro') && localStorage.getItem('NavigationMuro') == 1) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=$(vL_semana_anterior)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          anterior = reply.variableValue
          if (anterior == '1') {
            localStorage.setItem('tiempoMuro', 'Semana Anterior')
            window.changeDropdownTiempoMuro()
            window.setFilterByValue('#SELECTOR_TIEMPO_M', 'Semana Anterior')
          }
          else {
            localStorage.setItem('tiempoMuro', 'Semana Actual')
            window.changeDropdownTiempoMuro()
            window.setFilterByValue('#SELECTOR_TIEMPO_M', 'Semana Actual')
          }
          localStorage.setItem('tiempoCitas', 'Semana Actual')

          window.setFilterByValue('#TOTALES_RATIO', 'Media por empleado')
          localStorage.setItem('NavigationMuro', 2)
          localStorage.setItem('NavigationCitas', 1)
        }
      })
    })

  }

}


// window.setDefaultTimeMeeter = function () {
//   let anterior
//   if (window.location.href.includes('#/meeter')) {
//     localStorage.setItem('fechaStorage','Semana Actual')
//     localStorage.setItem('tiempoMeeter', 'Semana Actual')
//     //window.changeDropdownTiempoMeeter()
//     window.setFilterByValue('#SELECTOR_TIEMPO', 'Semana Actual')
   
//   }
  
// }

window.initializeTiempoSelectorMeeter = function(){
  localStorage.removeItem('fechaStorage')
  if(window.app){
    const hypercube = {
      qDef: {
        qFieldDefs: ['#SELECTOR_TIEMPO']
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
    }
  
    window.app.createList(hypercube, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.qListObject.qDataPages.length > 0) {
          let list = reply.qListObject.qDataPages[0].qMatrix
          let values = []
          for (let i = 0; i < list.length; i++) {
            if (list[i][0].qState !== 'X'){
              values.push(list[i][0].qText)
            } 
          }
  
          const orden = ['Semana Actual', 'Semana Anterior', 'Mes Actual', 'Año en curso', 'Últ. 3 meses', 'Últ. 12 meses']
  
          const valuesSorted = []
  
          let flagFilterAvailable = false
  
          for (let i of orden) {
            if (values.includes(i)) {
              valuesSorted.push(i)
              flagFilterAvailable = true
              break
            }
          }
  
          if(flagFilterAvailable> 0){
            window.app.field('Fecha').clear().then(()=>{
              window.setFilterByValue('#SELECTOR_TIEMPO', valuesSorted[0])
              localStorage.setItem('fechaStorage',valuesSorted[0])
            })
          }
        
        }
      })
    });
  }
  
}


window.navigationPageCitas = function () {
  localStorage.setItem('NavigationCitas', 1)
}

window.navigationPageCitas()

window.navigationPageMuro = function () {
  localStorage.setItem('NavigationMuro', 1)
}

window.navigationPageMuro()


window.changeDropdownTiempo = function () {
  let actualTime = localStorage.getItem('tiempoCitas')
  let e = document.querySelector('#op_tiempo')
  if (e) {
    let optionSelected = e.options[e.selectedIndex]
    if (actualTime != optionSelected.value) {
      for (let i = 0; i < e.options.length; i++) {
        if (e.options[i].value == actualTime) {
          e.options[i].selected = true
        }
        else {
          e.options[i].selected = false
        }
      }
    }
  }
}

window.changeDropdownTiempoMuro = function () {
  let actualTime = localStorage.getItem('tiempoMuro')
  let e = document.querySelector('#op_tiempo')
  if (e) {
    let optionSelected = e.options[e.selectedIndex]
    if (actualTime != optionSelected.value) {
      for (let i = 0; i < e.options.length; i++) {
        if (e.options[i].value == actualTime) {
          e.options[i].selected = true

        }
        else {
          e.options[i].selected = false
        }
      }
    }
  }
}



window.reloadTabObject = function (value) {
  window.$eventBus.$emit('reloadTabObject', value)
}


window.hideNavBarListener = function () {
  if (window.innerWidth == 1024) {

    document.addEventListener('mouseup', function (e) {
      var container = document.getElementsByClassName('container');
      if (container[0].contains(e.target)) {
        let dropDownObjects = document.getElementsByClassName('dropdown-menu')
        for (let i = 0; i < dropDownObjects.length; i++) {
          if (dropDownObjects[i].style.display == 'block') {
            dropDownObjects[i].style.display = 'none'
          }
        }
      }
    })

  }
  else if (window.innerWidth < 1024) {

    document.addEventListener('mouseup', function (e) {
      var container = document.getElementsByClassName('fixed-tabs');
      if (!container[0].contains(e.target)) {
        let childsTabObjects = document.getElementsByClassName('childs-tab')
        for (let i = 0; i < childsTabObjects.length; i++) {
          if (!childsTabObjects[i].classList.contains('d-none')) {
            childsTabObjects[i].classList.add('d-none')
          }
        }
      }
    })
  }

}


window.destroyHideNavBarListener = function () {
  if (window.innerWidth == 1024) {
    document.removeEventListener('mouseup', function (e) {
      var container = document.getElementsByClassName('container');
      if (container[0] && container[0].contains(e.target)) {
        let dropDownObjects = document.getElementsByClassName('dropdown-menu')
        for (let i = 0; i < dropDownObjects.length; i++) {
          if (dropDownObjects[i].style.display == 'block') {
            dropDownObjects[i].style.display = 'none'
          }
        }
      }
    })
  }
  else if (window.innerWidth < 1024) {

    document.addEventListener('mouseup', function (e) {
      var container = document.getElementsByClassName('fixed-tabs');
      if (!container[0].contains(e.target)) {
        let childsTabObjects = document.getElementsByClassName('childs-tab')
        for (let i = 0; i < childsTabObjects.length; i++) {
          if (!childsTabObjects[i].classList.contains('d-none')) {
            childsTabObjects[i].classList.add('d-none')
          }
        }
      }
    })
  }

}

window.initializeTabCumplimientoProduccion = function (app) {
  var components = document.querySelectorAll('.tab-first-level .nav-tabs li')
  app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_roscos)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId)
    if (reply.variableValue == '0') {
      components[0].children[0].click()
    } else if (reply.variableValue == '1') {
      components[1].children[0].click()
    }
  })
}


window.waitForElement = function (selector, callback) {
  // Crear una instancia de MutationObserver
  const observer = new MutationObserver((mutationsList, observer) => {
    // Verificar si el elemento objetivo está presente en el DOM
    let elemento = document.querySelectorAll(selector)[0]
    if (document.contains(elemento)) {
      // Detener la observación de mutaciones
      observer.disconnect();
      // Ejecutar la acción una vez que el elemento esté disponible
      callback(elemento);
    }
  });

  // Observar cambios en el DOM
  observer.observe(document.documentElement, { childList: true, subtree: true });
  //}
  // // Selecciona el nodo que será observado por las mutaciones
  // var targetNode = document.body;

  // // Opciones para el observador (qué mutaciones observar)
  // var config = { childList: true, subtree: true };

  // // Función de retorno que se ejecuta cuando se observan mutaciones
  // var observerCallback = function(mutationsList, observer) {
  //   // Usa un bucle 'for' tradicional para IE 11
  //   for(var mutation of mutationsList) {
  //     if (mutation.type === 'childList') {
  //       // Verifica si el componente existe en el documento
  //       var element = document.querySelector(selector);
  //       if (element) { 
  //         // Detiene la observación
  //         observer.disconnect();
  //         // Llama a la función de retorno con el componente como argumento
  //         callback(element);
  //       }
  //     }
  //   }
  // };

  // // Crea una instancia del observador vinculada a la función de retorno
  // var observer = new MutationObserver(observerCallback);

  // // Comienza a observar el nodo objetivo por las mutaciones configuradas
  // observer.observe(targetNode, config);

}

window.initializeTiempoSelectorInformes = function(){

  if(window.app){
    const hypercube = {
      qDef: {
        qFieldDefs: ['#SELECTOR_TIEMPO']
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
    }
  
    window.app.createList(hypercube, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.qListObject.qDataPages.length > 0) {
          let list = reply.qListObject.qDataPages[0].qMatrix
          let values = []
          for (let i = 0; i < list.length; i++) {
            if (list[i][0].qState !== 'X'){
              values.push(list[i][0].qText)
            } 
          }
  
          const orden = ['Mes Actual', 'Año en curso', 'Últ. 3 meses', 'Últ. 6 meses', 'Últ. 12 meses', 'Año anterior']
  
          const valuesSorted = []
  
          let flagFilterAvailable = false
  
          for (let i of orden) {
            if (values.includes(i)) {
              valuesSorted.push(i)
              flagFilterAvailable = true
              break
            }
          }
  
          console.log('Valores en values', values)
          console.log('Selección por defecto', valuesSorted)

          if(flagFilterAvailable> 0){
            window.app.field('Fecha').clear().then(()=>{
              window.setFilterByValue('#SELECTOR_TIEMPO', valuesSorted[0])
            })
          }
        
        }
      })
    });
  }
  
}

window.initializeTiempoSelectorInformesEstructura3 = function(){

  if(window.app){
    const hypercube = {
      qDef: {
        qFieldDefs: ['#SEM_ACT']
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
    }
  
    window.app.createList(hypercube, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.qListObject.qDataPages.length > 0) {
          let list = reply.qListObject.qDataPages[0].qMatrix
          let values = []
          for (let i = 0; i < list.length; i++) {
            if (list[i][0].qState !== 'X'){
              values.push(list[i][0].qText)
            } 
          }
  
          const orden = ['Semana anterior', 'Semana actual']
  
          const valuesSorted = []
  
          let flagFilterAvailable = false
  
          for (let i of orden) {
            if (values.includes(i)) {
              valuesSorted.push(i)
              flagFilterAvailable = true
              break
            }
          }
  
          if(flagFilterAvailable> 0){
            window.app.field('Fecha').clear().then(()=>{
              localStorage.setItem('fechaStorage', valuesSorted[0])
              window.setFilterByValue('#SEM_ACT', valuesSorted[0])
            })
          }
        
        }
      })
    });
  }
  
}



window.initializeTiempoSelector = function () {

  //window.setFilterByValue('#SELECTOR_TIEMPO', 'Mes Actual')

  localStorage.removeItem('fechaStorage')

  const hypercube = {
    qDef: {
      qFieldDefs: ['#SELECTOR_TIEMPO']
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
  }

  window.app.createList(hypercube, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.qListObject.qDataPages.length > 0) {
        let list = reply.qListObject.qDataPages[0].qMatrix
        let values = []
        for (let i = 0; i < list.length; i++) {
          if (list[i][0].qState !== 'X'){
            values.push(list[i][0].qText)
          } 
        }

        const orden = ['Mes Actual', 'Año en curso', 'Últ. 3 meses', 'Últ. 6 meses', 'Últ. 12 meses', 'Año anterior' ]

        const valuesSorted = []

        let flagFilterAvailable = false

        for (let i of orden) {
          if (values.includes(i)) {
            valuesSorted.push(i)
            flagFilterAvailable = true
            break
          }
        }

        if(flagFilterAvailable> 0){
          window.app.field('Fecha').clear().then(()=>{
            window.setFilterByValue('#SELECTOR_TIEMPO', valuesSorted[0])
          })
        }
      
      }
    })
  });
}


window.listenerInforme = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.dontClearFilterCampanaInforme);
  }
}

window.destroyListenerInforme = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.dontClearFilterCampanaInforme);
  }
}

window.dontClearFilterCampanaInforme = function () {
  if (window.app) {
    let filterExists = false
    window.selState = window.app.selectionState();
    for (let i = 0; i < window.selState.selections.length; i++) {
      if (window.selState.selections[i].fieldName == "#INFORME") {
        localStorage.setItem('filterCampana', window.selState.selections[i].qSelected.toString())
        filterExists = true
      }
    }
    if (!filterExists) {
      window.setFilterByValue('#INFORME', localStorage.getItem('filterCampana'))
    }
  }
}

window.createListenerExperiencia = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.checkExperiencia);
  }
}

window.destroyListenerExperiencia = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.checkExperiencia);
  }
}

window.checkExperiencia = function () {
  let selecciones = window.app.selectionState().selections
  let experiencia = false
  for (let i = 0; i < selecciones.length; i++) {
    if (selecciones[i].fieldName === '#Experiencia_VA') {
      localStorage.setItem('experiencia', selecciones[i].qSelected)
      experiencia = true
      break
    }
  }
  if (!experiencia) {
    window.setFilterByValue('#Experiencia_VA', localStorage.getItem('experiencia'))
  }
}




window.createListenerOrdenVista = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.checkOrdenVista);
  }
}

window.destroyListenerOrdenVista = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.checkOrdenVista);
  }
}


window.checkOrdenVista = function () {
  let selecciones = window.app.selectionState().selections
  let ordenVista = false
  for (let i = 0; i < selecciones.length; i++) {
    if (selecciones[i].fieldName === '#ORDEN_VISTA') {
      localStorage.setItem('ordenVista', selecciones[i].qSelected)
      ordenVista = true
      break
    }
  }
  if (!ordenVista) {
    window.setFilterByValue('#ORDEN_VISTA', localStorage.getItem('ordenVista'))
  }
}

window.createListenerLocateIconsPivotTable = function (selector, selectorIcons, page) {

  const elemento = document.querySelectorAll(selector)[0];

  // Crea una instancia de ResizeObserver
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      // Obtiene el nuevo ancho del elemento
      const nuevoAncho = entry.contentRect.width;
      // Recoloca el objeto
      window.locateIconsPivotTable(selector, selectorIcons, page)

      break
    }
  });

  observer.observe(elemento)

  return observer

}





window.locateIconsPivotTable = function (selector, selectorIcons, page) {

  //console.log("hago un locate", new Date())


  window.waitForElement(selector, (reply) => {
    var width = document.querySelectorAll(selector)[0].offsetWidth

    window.waitForElement(selectorIcons, (reply) => {

      const p = new Promise((resolve, reject) => {
        let obj = document.querySelectorAll(selectorIcons)[0]

        const p2 = new Promise((resolve, reject) => {
          let classList = document.querySelectorAll(selectorIcons)[0].classList

          if (classList.contains('expand-bar')) width -= 420

          if (page === 'retos' && !classList.contains('expand-bar')) {
            width += 17
          }

          resolve(width)
        })

        p2.then(width => {

          obj.style.left = (width - 75) + 'px'
        })


        resolve()
      })

      p.then(()=>{
        window.actualQlik.resize()
        window.$eventBus.$emit('reloadDrawerNavbar')
      })


    })


  })



}

window.createListenerExpandAndLocateIcons = function (page) {


  window.waitForElement('.btn-link.pull-right', () => {
    window.elementButtonPivotTable = document.querySelectorAll('.btn-link.pull-right')[0]

    window.elementButtonPivotTable.addEventListener('click', window.actionListenerPivotTable, page)
  })

}

window.destroyListenerExpandAndLocateIcons = function (page) {
  window.elementButtonPivotTable.removeEventListener('click', window.actionListenerPivotTable, page)
}


window.actionListenerPivotTable = function (page) {


  let selector = '.tabla-pivot tbody tr:nth-child(3) th:first-child'
  let selectorIcons = '.tabla-pivot .qlik-basic-object-title'

  //setTimeout(()=>{
  //window.locateIconsPivotTable(selector,selectorIcons,page)
  //},3000)


}




localStorage.setItem("lastpage", null)

window.getActualPage = function () {
  return location.href.split('pages_')[1].replace('.json', '')
}


window.clearIfNewPage = function () {
  if (localStorage.getItem('lastpage') !== window.getActualPage()) {
    window.app.clearAll()
    localStorage.removeItem('selections')
  }
}


window.listenerIsImagin = function () {
  if (window.app) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: "=$(vL_selector_imagin)"
      }
    }, function (reply) {
      window.hypercubeImagineVariable = reply.qInfo.qId
      if (reply.variableValue === '0') {
        Array.from(document.querySelectorAll('.qbo-JcSFAZj, .qbo-UPLJemM, .qbo-rPpsD')).map((e) => e.classList.remove('d-none'))
      } else {
        Array.from(document.querySelectorAll('.qbo-JcSFAZj, .qbo-UPLJemM, .qbo-rPpsD')).map((e) => e.classList.add('d-none'))
      }
    })
  }
}

window.destroyListenerIsImagin = function () {
  if (window.app) {
    window.app.destroySessionObject(window.hypercubeImagineVariable)
  }
}

window.imagineFiltersUpdate = function () {

}

window.fixSelections = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.fixSelectionsAction);
  }
}

window.destroyFixSelections = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.fixSelectionsAction);
  }
}

window.fixSelectionsAction = function () {
  // obtiene el array de selecciones del localstorage
  let selections = {}
  let selectionsLocalStorage = localStorage.getItem("selections").split('|')

  //console.log(window.app.selectionState())
  for (let i = 0; i < selectionsLocalStorage.length; i += 2) {
    let founded = false
    for (let s of window.app.selectionState().selections) {
      if (s.fieldName === selectionsLocalStorage[i]) {
        for (let sv of s.selectedValues) {
          if (sv.qName === selectionsLocalStorage[i + 1]) {
            founded = true
            break
          }
        }
        break
      }
    }

    if (founded === false) {
      window.setFilterByValue(selectionsLocalStorage[i], selectionsLocalStorage[i + 1])
    }

  }

  // obtiene array de selecciones de qlik y lo recorre

  // si el nombre del campo está en el localstorage, revisa si los valores del localstorage están en el qlik, sino los añade


}

window.getTypePivotTable = function (element) {
  return new Promise((resolve, reject) => {
    resolve(element.children[0].classList)
  })
}


window.expandPivotTable = function (id, page) {

  window.waitForElement('.pivot-table .qlik-basic-object-title .btn-link', function () {
    document.querySelectorAll('.pivot-table .qlik-basic-object-title .btn-link')[2].classList.remove('d-none')
    document.querySelectorAll('.pivot-table .qlik-basic-object-title .btn-link')[1].classList.add('d-none')
  })

  const p = new Promise((resolve, reject) => {
    window.app.getObject(id).then(function (model) {

      // Retrieve the current properties of the object
      model.getProperties().then(function (properties) {
        // Define the patch
        let patch = [{
          "qOp": "replace",
          "qPath": "/qHyperCubeDef/qAlwaysFullyExpanded",
          "qValue": "true"
        }];

        // Apply the patch
        model.applyPatches(patch, true); // Second parameter (soft-apply-flag) set to true
      });
    }

    )

    resolve()
  })

  p.then(() => {
    window.actualQlik.resize()

    let selector = '.tabla-pivot tbody tr:nth-child(3) th:first-child'
    let selectorIcons = '.tabla-pivot .qlik-basic-object-title'

    window.locateIconsPivotTable(selector, selectorIcons, page)

    window.actualQlik.resize()
  })





}


window.collapsePivotTable = function (id, page) {

  window.waitForElement('.pivot-table .qlik-basic-object-title .btn-link', function () {
    document.querySelectorAll('.pivot-table .qlik-basic-object-title .btn-link')[1].classList.remove('d-none')
    document.querySelectorAll('.pivot-table .qlik-basic-object-title .btn-link')[2].classList.add('d-none')
  })

  const p = new Promise((resolve, reject) => {
    window.app.getObject(id).then(function (model) {
      // Retrieve the current properties of the object
      model.getProperties().then(function (properties) {
        // Define the patch
        let patch = [{
          "qOp": "replace",
          "qPath": "/qHyperCubeDef/qAlwaysFullyExpanded",
          "qValue": "false"
        }];

        // Apply the patch
        model.applyPatches(patch, true); // Second parameter (soft-apply-flag) set to true
      });
    }

    )

    resolve()
  })



  p.then(() => {
    window.actualQlik.resize()

    let selector = '.tabla-pivot tbody tr:nth-child(3) th:first-child'
    let selectorIcons = '.tabla-pivot .qlik-basic-object-title'

    window.locateIconsPivotTable(selector, selectorIcons, page)

    window.actualQlik.resize()

  })
}


window.listenerDontClearFilterIndicador = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.dontClearFilterIndicador);
  }
}
window.destroyListenerDontClearFilterIndicador = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.dontClearFilterIndicador)
  }
}

window.dontClearFilterIndicador = function () {
  if (window.app) {
    let filterExists = false
    window.selState = window.app.selectionState();
    for (let i = 0; i < window.selState.selections.length; i++) {
      if (window.selState.selections[i].fieldName == '#SELECTOR_INDICADOR') {
        localStorage.setItem('filterindicador', window.selState.selections[i].qSelected.toString())
        filterExists = true
      }
    }

    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '$(vL_acciones_estructura)'
      }
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValue) {
          let value = reply.variableValue
          if(value === '1'){
            if(filterExists){
              window.app.field('#SELECTOR_INDICADOR').clear()
            }
          }else if(value === '2'){
            if (!filterExists) {
              window.canBeSelected('#SELECTOR_INDICADOR', localStorage.getItem('filterindicador')).then(reply => {
                if(reply){
                  window.setFilterByValue('#SELECTOR_INDICADOR', localStorage.getItem('filterindicador'))
                }else{
                  window.selectFirstOptionPosible('#SELECTOR_INDICADOR')
                }
              }) 
            }
          }
        }
      })
    })

    
    



    
  }
}


window.listenerDontClearFilterTotalesRatio = function () {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.bind(window.dontClearFilterTotalesRatio);
    }
  }
  window.destroyListenerDontClearFilterTotalesRatio = function () {
    if (window.app) {
      window.selState = window.app.selectionState();
      window.selState.OnData.unbind(window.dontClearFilterTotalesRatio)
    }
  }
  
  window.dontClearFilterTotalesRatio = function () {
    if (window.app) {
      let filterExists = false
      window.selState = window.app.selectionState();
      for (let i = 0; i < window.selState.selections.length; i++) {
        if (window.selState.selections[i].fieldName == '#TOTALES_RATIO') {
          localStorage.setItem('filtertotalesratio', window.selState.selections[i].qSelected.toString())
          filterExists = true
          break
        }
      }
  
      if (!filterExists) {
        window.canBeSelected('#TOTALES_RATIO', localStorage.getItem('filtertotalesratio')).then(reply => {
          if(reply){
            window.setFilterByValue('#TOTALES_RATIO', localStorage.getItem('filtertotalesratio'))
          }else{
            window.setFilterByValue('#TOTALES_RATIO', 'Total')
            //window.selectFirstOptionPosible('#TOTALES_RATIO')
          }
        }) 
      }
      
    }
  }

  window.initializeTotalesRatio = function(){
    return new Promise((resolve,reject)=>{
      window.setFilterByValue('#TOTALES_RATIO', 'Total').then(()=>{
        localStorage.setItem('filtertotalesratio', 'Total') 
        resolve()
      })
    })
  }
  


window.selectCheckOtrosInformes = function(idCheck){
  Array.from(document.querySelectorAll('.check input:not(#'+idCheck+')')).forEach((e)=>e.checked = false)

  if (window.innerWidth >= 1024) {
    let arrayValuesCheck = []
    let inputsChecks = document.querySelectorAll('.informesoficina .check label input')
    for (let i = 0; i < inputsChecks.length; i++) {
      if (inputsChecks[i].checked) {
        arrayValuesCheck.push(inputsChecks[i].value)
      }
    }

    if (arrayValuesCheck) {
        window.app.field("#SEL_INF_AVE").clear().then(() => {
          window.setFilterByMultipleValues('#SEL_INF_AVE', arrayValuesCheck)
        })

    }

  }
}




window.listenerCheckOtrosInformes = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionCheckOtrosInformes);
  }
}

window.destroyListenerCheckOtrosInformes = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionCheckOtrosInformes);
  }
}



window.actionCheckOtrosInformes = function () {
  let array = window.app.selectionState().selections
  let buttonsCheck = []
  let flag = false

  for (let i = 0; i < array.length; i++) {
    if (array[i].fieldName == "#SEL_INF_AVE") {
      flag = true
      localStorage.setItem('checkOtrosInformes', array[i].qSelected)
    }
  }

  if (!flag) {
    let selections = []
    if (window.innerWidth >= 1024) {

      buttonsCheck = document.querySelectorAll('.informesoficina .check .container input:checked')
      selections = Array.from(buttonsCheck).map(b => b.value)
      //Array.from(buttonsCheck).forEach(b => b.check())
      if (selections.length > 0) {
        window.setFilterByMultipleValues('#SEL_INF_AVE', selections)
      }else{
        document.querySelectorAll('.informesoficina .check .container input')[0].checked = true
        window.setFilterByMultipleValues('#SEL_INF_AVE', 'Anuales')
      }

    } 

  }
}


window.listenerKeepFilterTiempoVentasInformes = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.keepFilterTiempoVentasInformes);
  }
}

window.destroyListenerKeepFilterTiempoVentasInformes = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.keepFilterTiempoVentasInformes);
  }
}


window.keepFilterTiempoVentasInformes = async function(){
  if(window.app){
    let foundSelectorTiempo = false
    let foundSelectorFecha = false
    let value
    let selectionState = window.app.selectionState()

    for (let s of selectionState.selections) {
      if (s.fieldName === '#SELECTOR_TIEMPO') {
        value = s.qSelected
        foundSelectorTiempo = true
      } else if (s.fieldName === 'Fecha') {
        foundSelectorFecha = true
      }
    }

    if(foundSelectorFecha){
      if(foundSelectorTiempo){
        await window.app.field('#SELECTOR_TIEMPO').clear()
      }
    }else{
      if(foundSelectorTiempo){
        localStorage.setItem('fechaStorage',value)
      }else if(localStorage.getItem('fechaStorage')){
        const stored = localStorage.getItem('fechaStorage')
        window.canBeSelected('#SELECTOR_TIEMPO', stored).then(async function(reply){
          if(reply){
            await window.setFilterByValue('#SELECTOR_TIEMPO', stored)
          } else {

            if (window.location.href.includes('accionescomerciales')) {
              const fallback = 'Total días acción'

              await window.setFilterByValue('#SELECTOR_TIEMPO', fallback)
            } else {
              console.log('Usando primera opción disponible')
              await window.selectFirstOptionPosible('#SELECTOR_TIEMPO')
            }
          }
        })
      } else {
        await window.selectFirstOptionPosible('#SELECTOR_TIEMPO')
      }
    }
  } else {
    console.warn('window.app no está disponible')
  }
}


window.listenerKeepFilterTiempoVentasInformesEstructura3 = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.keepFilterTiempoVentasInformesEstructura3);
  }
}

window.destroyListenerKeepFilterTiempoVentasInformesEstructura3 = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.keepFilterTiempoVentasInformesEstructura3);
  }
}


window.keepFilterTiempoVentasInformesEstructura3 = async function(){
  if(window.app){
    let foundSelectorTiempo = false
    let foundSelectorFecha = false
    let value
    let selectionState = window.app.selectionState()

    for (let s of selectionState.selections) {
      if (s.fieldName === '#SEM_ACT') {
        value = s.qSelected
        foundSelectorTiempo = true
      } else if (s.fieldName === 'Fecha') {
        foundSelectorFecha = true
      } 
    }
  
    if(foundSelectorFecha){
      if(foundSelectorTiempo){
        await window.app.field('#SEM_ACT').clear()
      }
    }else{
      if(foundSelectorTiempo){
        localStorage.setItem('fechaStorage',value)
      }else if(localStorage.getItem('fechaStorage')){
        window.canBeSelected('#SEM_ACT',localStorage.getItem('fechaStorage')).then(async function(reply){
          if(reply){
            await window.setFilterByValue('#SEM_ACT',localStorage.getItem('fechaStorage'))
          }else{
            await window.selectFirstOptionPosible('#SEM_ACT')
          }
        })
      }
    }
  }

  
}


window.headerKey = '0'

window.updateHeaderKey = function(){
  if(window.headerKey === '0'){
    window.headerKey = '1'
  }else{
    window.headerKey = '0'
  }
}

window.selectValues = function (filtername, values){
  window.app.field(filtername).selectValues(values,true,true)
}

window.selectFirstOptionPosible = function(filterName){
 
    let _self = this

    var cubeDef = {
      qDimensions:[
        {
          "qDef": {
            "qFieldDefs": [filterName]
          }
        }
      ],
      qMeasures: [],
      qInitialDataFetch: [
        {
          "qTop": 0,
          "qLeft": 0,
          "qHeight": 100,
          "qWidth": 1
        }
      ]

    }

    _self.app.createCube(cubeDef, reply => {

      window.app.destroySessionObject(reply.qInfo.qId).then(async function(){

        if (reply.qHyperCube.qDataPages[0].qMatrix && reply.qHyperCube.qDataPages[0].qMatrix.length > 0) {

          let valuesHypercube = reply.qHyperCube.qDataPages[0].qMatrix

          for(let i in valuesHypercube){

            if(valuesHypercube[i][0].qState !== 'X'){
              await window.selectValues(filterName, [valuesHypercube[i][0].qText])
              break
            }

          }

        }
      })
    }).catch(error => {
      console.log(error)
      resolve()
    })

}

window.canBeSelected = function(filter,value){
  return new Promise((resolve,reject)=>{
    window.app.createList(window.cubeDefinition(filter),function(reply){
      window.app.destroySessionObject(reply.qInfo.qId).then(function(){
        if(reply.qListObject.qDataPages.length > 0){
          let values = reply.qListObject.qDataPages[0].qMatrix
          for(let i in values){
            if(values[i][0].qText === value){
              if(values[i][0].qState !== 'X'){
                resolve(true)
              }
              break
            } 
          }
          resolve(false)
        }
      })
    })
  })
}


window.actionKeepAllFilters = async function(){
  if(window.app){
    let selections = window.app.selectionState().selections

    let currentSelectionsJson = []

    if(selections){
      for(let s of selections){

        let values = undefined
        if(s.fieldName === 'Fecha' || s.fieldName === 'Semana' || s.fieldName === 'Mes'){
          values = await window.getElemNumbers(s.fieldName);
          values = values.map(e => e.toString())
        }else{
          values = Array.from(s.selectedValues).map( v => v.qName)
        }
        let field = s.fieldName
        currentSelectionsJson[field] = values
  
      }
  
      let savedSelectionsRaw = localStorage.getItem('selections') 
       if (savedSelectionsRaw) {
        let savedSelections = localStorage.getItem('selections').split('|')
  
        for(let i = 0; i < savedSelections.length -1 ; i+=2){
          let field = savedSelections[i]
          let values = savedSelections[i+1].split(',')
    
          let currentValues = currentSelectionsJson[field]
    
          if(!currentValues || !window.valuesAreIncluded(currentValues,values)){
            await window.setFilterByMultipleValues(field,values) 
            break
          }  
        }
      }
    }
  }
}

window.valuesAreIncluded = function(firstArray,secondArray){
  for(let v of secondArray){
    if(!firstArray.includes(v)){
      return false
    }
  }
  return true
}


window.listenerKeepAllFilters = async function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    await window.selState.OnData.bind(window.actionKeepAllFilters);
    await window.actionKeepAllFilters()
  }
}

window.destroyListenerKeepAllFilters = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionKeepAllFilters);
  }
}

window.createListenerNameTabsProduccionCumplimiento = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerNameTabsProduccionCumplimiento);
  }
}

window.destroyListenerNameTabsProduccionCumplimiento = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.actionListenerNameTabsProduccionCumplimiento);
  }
}


window.actionListenerNameTabsProduccionCumplimiento = function(){
  if(window.app){
    window.app.createGenericObject({
      variableValueCumplimiento: {
        qStringExpression: '=$(vL_titulo_rosco_cumplimiento)'
      },
      variableValueProduccion: {
        qStringExpression: '=$(vL_titulo_rosco_produccion)'
      }      
    }, function (reply) {
      window.app.destroySessionObject(reply.qInfo.qId).then(function () {
        if (reply.variableValueCumplimiento && reply.variableValueCumplimiento) {
          Array.from(document.querySelectorAll('.cumplimiento .tab-first-level .nav-tabs .nav-item .nav-link span')).slice(0,2).map((e,index) =>{
            if(index == 0){
              e.innerText = reply.variableValueCumplimiento
            } else if(index == 1){
              e.innerText = reply.variableValueProduccion
            }
          })
        }
      })
    })
  }
}

window.initializeFiltersAportacionSegmentos = function(){
  if(window.app){
    window.app.clearAll().then(()=>{
      window.app.field('#ORDEN_VISTA').selectValues(['1'],false,true)
      window.app.field('#FLAG_COMERCIAL').selectValues(['Comercial'],false,true)
      window.app.field('#FLAG_RECURRENCIA').selectValues(['Anual'],false,true)
      window.app.field('#Segmento').selectValues(['Total'],false,true)
      window.app.field('#Negocio').selectValues(['Total'],false,true)
    })
  }
}





window.createListenerChangeFirstTabAcciones = function () {
  if (window.app) {
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=vL_titulo_pestanya_productos'
      }
    }, function (reply) {

      window.idListenerChangeFirstTabAcciones = reply.qInfo.qId;
      
      let newValue = reply.variableValue;
      if (newValue) {
        let selectorTab1 = '.tab-productos-estadoslogisticos .nav-item:nth-child(1) .nav-link span';
        Array.from(document.querySelectorAll(selectorTab1)).forEach(e => e.innerHTML = newValue);
      }
      
    });
  }
};


window.destroyListenerChangeFirstTabAcciones = function () {
  if (window.app && window.idListenerChangeFirstTabAcciones) {
    window.app.destroySessionObject(window.idListenerChangeFirstTabAcciones);
    window.idListenerChangeFirstTabAcciones = null;
  }
};

window.actionListenerChangeSecondTabAcciones = function () {
  let id2 = 'qhjDq'; 
  let selectorTab2 = '.tab-productos-estadoslogisticos .nav-item:nth-child(2) .nav-link span';

  window.app.getObject(id2).then(reply => {
    Array.from(document.querySelectorAll(selectorTab2)).forEach(e => e.innerHTML = reply.layout.title);
  });
};

window.createListenerChangeSecondTabAcciones = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.actionListenerChangeSecondTabAcciones);
    window.actionListenerChangeSecondTabAcciones();
  }
};

window.destroyListenerChangeSecondTabAcciones = function () {
  if (window.selState) {
    window.selState.OnData.unbind(window.actionListenerChangeSecondTabAcciones);
  }
};


window.changeSelectorMeeter = function(){
  let sel = document.getElementById('meeter-selector')

  let selectedValue = sel.options[sel.selectedIndex].value

  console.log(document.querySelectorAll('.container-selector .graph:not(.'+selectedValue+')'))

  Array.from(document.querySelectorAll('.container-selector .graph:not(.'+selectedValue+')')).map(e => e.classList.add('d-none'))

  Array.from(document.querySelectorAll('.container-selector .graph.'+selectedValue)).map(e => e.classList.remove('d-none'))

  window.actualQlik.resize()

}


//Muestra u oculta el switch intouch y recoloca los objetos según se muestre o no.
window.checkInTouchMeeter = function () {


  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=$(vL_retail_intouch)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      
    })
  })
}



window.listenerKeepFilterTiempoMeeter = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.bind(window.keepFilterTiempoMeeter);
  }
}

window.destroyListenerKeepFilterTiempoMeeter = function () {
  if (window.app) {
    window.selState = window.app.selectionState();
    window.selState.OnData.unbind(window.keepFilterTiempoMeeter);
  }
}


window.keepFilterTiempoMeeter = async function(){
  if(window.app){
    let foundSelectorTiempo = false
    let value
    let selectionState = window.app.selectionState()

    for (let s of selectionState.selections) {
      if (s.fieldName === '#SELECTOR_TIEMPO') {
        value = s.qSelected
        foundSelectorTiempo = true
        break
      }
    }
  
    if(foundSelectorTiempo){
      localStorage.setItem('fechaStorage',value)
    }else if(localStorage.getItem('fechaStorage')){
      window.canBeSelected('#SELECTOR_TIEMPO',localStorage.getItem('fechaStorage')).then(async function(reply){
        if(reply){
          await window.setFilterByValue('#SELECTOR_TIEMPO',localStorage.getItem('fechaStorage'))
        }else{
          await window.selectFirstOptionPosible('#SELECTOR_TIEMPO')
        }
      })
    }
  }

  
}

window.modifyTotalCitasMediaEspera = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=Only(#TOTAL_MEDIA)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        if (reply.variableValue == 'Media Espera') {
          window.setFilterByValue('#TOTAL_MEDIA', 'Total')
          localStorage.setItem('totalmedia', 'Total')
        }
        else {
          window.setFilterByValue('#TOTAL_MEDIA', 'Media Espera')
          localStorage.setItem('totalmedia', 'Total')
        }

      }
    })
  })
}

window.executeExcelExport = function (app,qlik,id) {
  return new Promise((resolve,reject) => {
    app.getObjectProperties(id).then(model => { 
      let table = qlik.table(model)
      table.exportData({ download: false }, (reply) => {
        let qlikUrl = window.location.hostname == 'localhost' ? '': `${window.getSecure() ? 'https://' : 'http://'}${window.getHost()}`
        let link = document.createElement('a')
        link.href = `${qlikUrl}${reply}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        resolve()
      }).catch(e => {
        reject(e)
      })     
    }).catch(e => reject(e))
  })
}


window.clickAyuda = function(){
  var pdfUrl = 'application/Catalogo_Ayuda.pdf';
  // Crear un elemento <a>
  var link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Catalogo_Ayuda.pdf';  // Nombre del archivo que se descargará
  //Simular un clic en el enlace para iniciar la descarga
  link.dispatchEvent(new MouseEvent('click'));
}


window.linkAndFilterByTopProducts = function(objectId){
  window.app.getObjectProperties(objectId).then(model => {
    var cubeDef = {
      qDimensions: model.properties.qHyperCubeDef.qDimensions,
      qMeasures: model.properties.qHyperCubeDef.qMeasures,
      qInitialDataFetch: [
        {
          "qTop": 0,
          "qLeft": 0,
          "qHeight": 100,
          "qWidth": model.properties.qHyperCubeDef.qDimensions.length + model.properties.qHyperCubeDef.qMeasures.length
        }
      ]
    }
    window.app.createCube(cubeDef, reply => {
      window.app.destroySessionObject(reply.qInfo.qId).then(()=>{
        
        let values = reply.qHyperCube.qDataPages[0].qMatrix.map(e =>{
          return e[0].qText
        } )
              
        window.agregarArrayAlHrefCatalogo(values)

      })
    })})


  window.agregarArrayAlHrefCatalogo = function(arrayValores) {
    // Obtener el href actual del elemento
    var hrefActual = '/catalogocompleto%3F_page=application%2Fpages_catalogocompleto.json';
    // Convertir el array a una cadena JSON y codificarlo para URL
    var valoresComoString = encodeURIComponent(arrayValores.join(','));
    // Construir el nuevo href con el array de valores como parámetro
    var nuevoHref = hrefActual + '&productos=' + valoresComoString;
    // Link al nuevo href
    window.$viewInstanceVue.$router.push({ path: nuevoHref })  
  }
}

window.linkAndFilterBySegments = function(objectId){
  window.app.getObjectProperties(objectId).then(model => {
    var cubeDef = {
      qDimensions: model.properties.qHyperCubeDef.qDimensions,
      qMeasures: model.properties.qHyperCubeDef.qMeasures,
      qInitialDataFetch: [
        {
          "qTop": 0,
          "qLeft": 0,
          "qHeight": 100,
          "qWidth": model.properties.qHyperCubeDef.qDimensions.length + model.properties.qHyperCubeDef.qMeasures.length
        }
      ]
    }
    window.app.createCube(cubeDef, reply => {
      window.app.destroySessionObject(reply.qInfo.qId).then(()=>{
        
        let values = reply.qHyperCube.qDataPages[0].qMatrix.map(e =>{
          return e[0].qText
        } )
              
        window.agregarArrayAlHrefSegmentos(values)

      })
    })})


  window.agregarArrayAlHrefSegmentos = function(arrayValores) {
    // Obtener el href actual del elemento
    var hrefActual = '/aportacionsegmentos%3F_page=application%2Fpages_retos.json';
    // Convertir el array a una cadena JSON y codificarlo para URL
    var valoresComoString = encodeURIComponent(arrayValores.join(','));
    // Construir el nuevo href con el array de valores como parámetro
    var nuevoHref = hrefActual + '&segmentos=' + valoresComoString;
    // Link al nuevo href
    window.$viewInstanceVue.$router.push({ path: nuevoHref })  
  }
}

window.linkAndFilterByNegocios = function(objectId){
  window.app.getObjectProperties(objectId).then(model => {
    var cubeDef = {
      qDimensions: model.properties.qHyperCubeDef.qDimensions,
      qMeasures: model.properties.qHyperCubeDef.qMeasures,
      qInitialDataFetch: [
        {
          "qTop": 0,
          "qLeft": 0,
          "qHeight": 100,
          "qWidth": model.properties.qHyperCubeDef.qDimensions.length + model.properties.qHyperCubeDef.qMeasures.length
        }
      ]
    }
    window.app.createCube(cubeDef, reply => {
      window.app.destroySessionObject(reply.qInfo.qId).then(()=>{
        
        let values = reply.qHyperCube.qDataPages[0].qMatrix.map(e =>{
          return e[0].qText
        } )
              
        window.agregarArrayAlHrefNegocios(values)

      })
    })})


  window.agregarArrayAlHrefNegocios = function(arrayValores) {
    // Obtener el href actual del elemento
    var hrefActual = '/aportacionsegmentos%3F_page=application%2Fpages_retos.json';
    // Convertir el array a una cadena JSON y codificarlo para URL
    var valoresComoString = encodeURIComponent(arrayValores.join(','));
    // Construir el nuevo href con el array de valores como parámetro
    var nuevoHref = hrefActual + '&negocio=' + valoresComoString;
    // Link al nuevo href
    window.$viewInstanceVue.$router.push({ path: nuevoHref })  
  }
}

window.filterByProducts = function(){

  // const urlParams = new URLSearchParams(decodeURIComponent(window.location.href).split('?')[1])
  // const values = urlParams.get('productos').split(',')

  // window.setFilterByMultipleValues('Producto',values)

  const urlParams = new URLSearchParams(decodeURIComponent(window.location.href).split('?')[1]);
  const values = urlParams.get('productos')?.split(',');
  const segmentos = urlParams.get('segmentos')?.split(',');
  const negocio = urlParams.get('negocio')?.split(',');

  if(values){
    window.setFilterByMultipleValues('Producto',values);
  }
  if (segmentos) {
    window.setFilterByMultipleValues('Segmento', segmentos);
  }
  if (negocio) {
    window.setFilterByMultipleValues('Negocio', negocio);
  }
}



window.changeNamesFirstTabInformes = function(app,variable1){
  let selectorTab1 = '.tab-productos-cupo .nav-item:nth-child(1) .nav-link span'

  app.variable.getContent(variable1, reply => {
    Array.from(document.querySelectorAll(selectorTab1)).forEach(e => e.innerHTML = reply.qContent.qString)
  })

}

window.changeNamesSecondTabInformes = function(app, variable2){
  let selectorTab2 = '.tab-productos-cupo .nav-item:nth-child(2) .nav-link span'

  app.variable.getContent(variable2, reply => {
    Array.from(document.querySelectorAll(selectorTab2)).forEach(e => e.innerHTML = reply.qContent.qString)
  })
}

window.actionSelectorOficina = function(value){
  window.app.field('#OP_IMPORTE').selectValues([value],false,true);

  document.querySelector('.header-item.selected')?.classList.remove('selected')
  document.querySelector('#' + value).classList.add('selected')
}


window.linkAndFilterByDimensions = function(dimensions, link){
  let selections = window.app.selectionState().selections
  let args = selections.filter(s => dimensions.includes(s.fieldName)).map(s => {return '&' + s.fieldName + '=' + s.selectedValues.map(e => e.qName).join(',')}).join('')
  
  console.log(link + encodeURIComponent(args) )
  window.$viewInstanceVue.$router.push({ path: link + encodeURIComponent(args) })  
}


window.filterByArgs = function(dimensions){

  const urlParams = new URLSearchParams(decodeURIComponent(window.location.href).split('?')[1])
  dimensions.forEach(async dim => {
    const values = urlParams.get(dim)?.split(',')
    if(values){
      await window.setFilterByMultipleValues(dim,values)
    }
  })

}


window.createListenerHideOptionsRed = function(){
  const elem = document.querySelectorAll('.tercera-estructura .qbo-sbrpXJ')
  elem[0].addEventListener('click',window.actionListenerHideOptionsRed)
}

window.actionListenerHideOptionsRed = function(){
  window.waitForElement('.ListBoxInline-listboxWrapper', function(container) {
    container.classList.add('hidden-options-tercera-estructura-red');
  });
};


window.destroyListenerHideOptionsRed = function(){
  const elem = document.querySelectorAll('.tercera-estructura .qbo-sbrpXJ')
  elem[0]?.removeEventListener('click',window.actionListenerHideOptionsRed)
}

window.linkToVariable = function(variable){
  if(window.app){
    window.app.createGenericObject({
      variableValue: {
        qStringExpression: '=('+variable+')'
      }
    }, function(reply){
      window.app.destroySessionObject(reply.qInfo.qId).then(function(){
        window.open(reply.variableValue);
      })
    })
  }
}

window.syncroFlipObject = function () {
  window.app.createGenericObject({
    variableValue: {
      qStringExpression: '=Only(#FLAG_INTOUCH)'
    }
  }, function (reply) {
    window.app.destroySessionObject(reply.qInfo.qId).then(function () {
      if (reply.variableValue) {
        console.log(reply.variableValue)
        if (reply.variableValue == 'Visión Retail') {
          if (document.querySelectorAll('.switch-intouch .toggle-container ul li')[0] &&
            !document.querySelectorAll('.switch-intouch .toggle-container ul li')[0].classList.contains('toggle-label-active')) {
              document.querySelectorAll('.switch-intouch .toggle-container ul li')[0].classList.add('toggle-label-active')
          }

          if(document.querySelectorAll('.switch-intouch .toggle-container ul li input')[0] && document.querySelectorAll('.switch-intouch .toggle-container ul li input')[0].checked){
            document.querySelectorAll('.switch-intouch .toggle-container ul li input')[0].checked = false
          }

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li')[2] &&
            document.querySelectorAll('.switch-intouch .toggle-container ul li')[2].classList.contains('toggle-label-active')) {
              document.querySelectorAll('.switch-intouch .toggle-container ul li')[2].classList.remove('toggle-label-active')
          }
        }else{
          if (document.querySelectorAll('.switch-intouch .toggle-container ul li')[2] &&
            !document.querySelectorAll('.switch-intouch .toggle-container ul li')[2].classList.contains('toggle-label-active')) {
              document.querySelectorAll('.switch-intouch .toggle-container ul li')[2].classList.add('toggle-label-active')
          }

          if(document.querySelectorAll('.switch-intouch .toggle-container ul li input')[0] && 
            !document.querySelectorAll('.switch-intouch .toggle-container ul li input')[0].checked){
            document.querySelectorAll('.switch-intouch .toggle-container ul li input')[0].checked = true
          }

          if (document.querySelectorAll('.switch-intouch .toggle-container ul li')[0] &&
            document.querySelectorAll('.switch-intouch .toggle-container ul li')[0].classList.contains('toggle-label-active')) {
              document.querySelectorAll('.switch-intouch .toggle-container ul li')[0].classList.remove('toggle-label-active')
          }

        }
      }
    })
  })
}

window.initializeFiltersOneSelected = function(filters, app){
  if(app){
    return new Promise((resolve,reject)=>{
      let promises = filters.map(f => {
        f.localStorage && localStorage.setItem(f.localStorage, f.value)
        console.log(`Initialize filter ${f.field} with value ${f.value}`)
        return app.field(f.field).selectMatch([f.value],false,true)
      })

      Promise.all(promises).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

window.initializeSelector = function (idSelector, dimension){
  return new Promise(async (resolve, reject) => {
    if(window.app){
      let selectionState = await window.app.selectionState()
      let filter = selectionState.selections.find(s => s.fieldName === dimension)
      if(filter){
        console.log(`Initialize filter component ${dimension} with value ${filter.qSelected}`)
        let value = filter.qSelected
        localStorage.setItem(idSelector, value)
        Array.from(document.querySelectorAll('#' + idSelector)).map(e => e.value = value)
        resolve()
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
  
}

window.visionCentroEmpleado = function() {
  window.app.createGenericObject(
    {
      variableValue: {
        qStringExpression: "=$(vL_vision_centro)"
      }
    },
    function(reply) {

      let variableValue = ''

      if (typeof reply.variableValue === 'object' && reply.variableValue !== null) {
        // Si es objeto con qNum/qText
        const qNum = reply.variableValue.qNum;
        const qText = reply.variableValue.qText

        if (typeof qNum === 'number' && !isNaN(qNum)) {
          variableValue = qNum.toString();
        } else if (qText !== undefined && qText !== null) {
          variableValue = qText.trim();
        }
      } else if (typeof reply.variableValue === 'string') {
        // Si es string directamente
        variableValue = reply.variableValue.trim();
      }

      if (!variableValue) {
        console.warn('Valor inválido para vL_vision_centro (vacío o no definido)', reply)
        return;
      }

      console.log('vL_vision_centro evaluado:', variableValue)

      let visionValue = ''
      if (variableValue === '1') {
        visionValue = 'Centro'
      } else if (variableValue === '0') {
        visionValue = 'Empleado'
      } else {
        console.warn('Valor inválido para vL_vision_centro después de evaluar', variableValue)
        return;
      }

      window.lastVisionCentroValue = visionValue

      window.setFilterByValue('#VISION_SIST', visionValue).then(() => {
        console.log(`El valor seleccionado para la dimensión #VISION_SIST es : ${visionValue}`)
      });

      window.app.destroySessionObject(reply.qInfo.qId)
    }
  )
}



window.actionVisionCentroEmpleado = function() {
  window.app.createGenericObject({
    selectedValue: {
      qStringExpression: '=Only([#VISION_SIST])'
    }
  }, function (reply){
    window.app.destroySessionObject(reply.qInfo.qId).then(() => {
      const value = reply.selectedValue ?? ''

      window.lastVisionCentroValue = value

      if (value === 'Centro'){
        document.querySelector('.tabla-informes-estructura-3-pivot-container').classList.remove('d-none')
        document.querySelector('.tabla-informes-estructura-3-container').classList.add('d-none')
      } else if(value === 'Empleado'){
        document.querySelector('.tabla-informes-estructura-3-pivot-container').classList.add('d-none')
        document.querySelector('.tabla-informes-estructura-3-container').classList.remove('d-none')
      } 

      window.actualQlik.resize()
     })
  })
}

window.listenerVisionCentroEmpleado = function () {
  if (!window.app) return
  if (!window.selState) window.selState = window.app.selectionState()
    window.selState.OnData.bind(window.actionVisionCentroEmpleado)
}

window.destroyListenerVisionCentroEmpleado = function () {
  if (window.app){
    window.selState = window.app.selectionState()
    window.selState.OnData.unbind(window.actionVisionCentroEmpleado)
  }
}
