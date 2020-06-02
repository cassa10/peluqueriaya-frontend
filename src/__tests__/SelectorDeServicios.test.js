import {shallow} from "enzyme";
import SelectorDeServicios from "../components/SelectorDeServicios";
import React from "react";
import { crearServicio } from '../testUtils/crearServicio';
import formatPrice from '../formatters/formatPrice';

const mockServicios = 
    [
        crearServicio(100,'Servicio 1', 150.5),
        crearServicio(101,'Servicio 2', 403.75),
        crearServicio(102,'Servicio 3', 20.75)
    ];

describe('SelectordeServiciosComponent', () => {
    describe('cuando el selector de servicios se monta correctamente', () => {
        let servicios = [];
        let corteMin;
        let handleCheckedFn = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });
        
        it('sin servicios y con corteMin 100.55, se muestra el servicio básico unicamente con el texto $100.55', () => {
            corteMin = 100.55;
            const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
            expect(existeListItem(component, 'corteMin')).toBeTruthy();
            expect(textoDescripcionListItem(component,'corteMin')).toEqual('Servicio básico');
            expect(textoPrecioListItem(component,'corteMin')).toEqual('$100.55');
        });
        
        it('con los tres servicios y corteMin 200, se muestra el servicio básico con precio $200 con el texto $200.00 y los servicios con sus nombres y precios', () => {
            corteMin = 200;
            servicios = mockServicios;
            const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
            expect(existeListItem(component, 'corteMin')).toBeTruthy();
            expect(textoDescripcionListItem(component,'corteMin')).toEqual('Servicio básico');
            expect(textoPrecioListItem(component,'corteMin')).toEqual('$200.00');
            assertExistenTodosLosListItemsYSusRespectivasDescripcionesYPrecios(component, servicios);
        });

        describe('con el servicio básico y los tres servicios mostrandose',() => {
            it('por defecto solo el servicio básico esta seleccionado', () => {
                corteMin = 200;
                servicios = mockServicios;
                const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
                expect(listItemCheckbox(component,'corteMin').prop('disabled')).toBeTruthy();
                assertTodosLosServiciosExceptoElBasicoNoEstanSeleccionados(component,servicios);
                expect(handleCheckedFn.mock.calls).toHaveLength(0);
            });
            it('cuando se hace click en el primer servicio (Servicio 1), este se selecciona y llama a la funcion handleCheckedFn con una lista con los servicios seleccionados como argumento',() =>{
                corteMin = 200;
                servicios = mockServicios;
                let primerServicio = servicios[0];

                const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
                listItemToBeClicked(component,primerServicio.id).props().onClick();
                
                expect(handleCheckedFn.mock.calls).toHaveLength(1);
                expect(firstArgumentOfFirstCallOfAFunction(handleCheckedFn)).toStrictEqual([primerServicio]);

                expect(listItemCheckbox(component,primerServicio.id).prop('checked')).toBeTruthy();
                expect(listItemCheckbox(component,servicios[1].id).prop('checked')).toBeFalsy();
                expect(listItemCheckbox(component,servicios[2].id).prop('checked')).toBeFalsy();
            });
            it('cuando se hace click en cada servicio, estos se seleccionan y llama a la funcion handleCheckedFn las veces que fueron seleccionados los servicios con una lista con los que fueron seleccionados en el orden que fueron llamados como argumento',() =>{
                corteMin = 200;
                servicios = mockServicios;

                const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
                listItemToBeClicked(component,servicios[0].id).props().onClick();
                expect(handleCheckedFn.mock.calls).toHaveLength(1);
                expect(firstArgumentOfNCallOfAFunction(handleCheckedFn,0)).toStrictEqual([servicios[0]]);

                listItemToBeClicked(component,servicios[1].id).props().onClick();
                expect(handleCheckedFn.mock.calls).toHaveLength(2);
                expect(firstArgumentOfNCallOfAFunction(handleCheckedFn,1)).toStrictEqual([servicios[0],servicios[1]]);

                listItemToBeClicked(component,servicios[2].id).props().onClick();
                expect(handleCheckedFn.mock.calls).toHaveLength(3);
                expect(firstArgumentOfNCallOfAFunction(handleCheckedFn,2)).toStrictEqual(servicios);

                expect(listItemCheckbox(component,servicios[0].id).prop('checked')).toBeTruthy();
                expect(listItemCheckbox(component,servicios[1].id).prop('checked')).toBeTruthy();
                expect(listItemCheckbox(component,servicios[2].id).prop('checked')).toBeTruthy();
            });
        });
    });
});

const existeListItem = (component, id) => component.find(`#list_item_${id}`).exists();
const textoDescripcionListItem = (component, id) => component.find(`#checkbox-list-label-${id}-text`).prop('primary');
const textoPrecioListItem = (component, id) => component.find(`#checkbox-list-label-${id}-text-price`).prop('primary');
const listItemCheckbox = (component, id) => component.find(`#checkbox-list-label-${id}`);
const listItemToBeClicked = (component, id) => component.find(`#list-item-${id}`);
const firstArgumentOfFirstCallOfAFunction = (func) => func.mock.calls[0][0];
const firstArgumentOfNCallOfAFunction = (func, n) => func.mock.calls[n][0];

const assertExisteServicioMinListItemYSuRespectivaDescripcionYPrecio = (component, servicio) => {
    expect(existeListItem(component, servicio.id)).toBeTruthy();
    expect(textoDescripcionListItem(component, servicio.id)).toEqual(servicio.nombre);
    expect(textoPrecioListItem(component,servicio.id)).toEqual(formatPrice(servicio.precio));
}

const assertExistenTodosLosListItemsYSusRespectivasDescripcionesYPrecios = (component, servicios) => {
    servicios.map((servicio) => {
        assertExisteServicioMinListItemYSuRespectivaDescripcionYPrecio(component,servicio);
    });
}

const assertTodosLosServiciosExceptoElBasicoNoEstanSeleccionados = (component, servicios) => {
    servicios.map((servicio) => {
        assertServicioNoEstaSeleccionado(component,servicio);
    });
}

const assertServicioNoEstaSeleccionado = (component, servicio) => {
    expect(listItemCheckbox(component,servicio.id).prop('checked')).toBeFalsy();
}
