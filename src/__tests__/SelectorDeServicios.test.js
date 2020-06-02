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
        it('sin servicios y con corteMin 100.55, se muestra el servicio básico unicamente con el texto $100.55', () => {
            corteMin = 100.55;
            const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
            expect(existeListItem(component, 'corteMin')).toBeTruthy();
            expect(textoDescripcionListItem(component,'corteMin')).toEqual('Servicio básico');
            expect(textoPrecioListItem(component,'corteMin')).toEqual('$100.55');
        });
        it('se muestra el servicio básico con precio $200 con el texto $200.00 y los servicios con sus nombres y precios', () => {
            corteMin = 200;
            servicios = mockServicios;
            const component = shallow(<SelectorDeServicios servicios={servicios} handleChecked={handleCheckedFn} corteMin={corteMin} />);
            expect(existeListItem(component, 'corteMin')).toBeTruthy();
            expect(textoDescripcionListItem(component,'corteMin')).toEqual('Servicio básico');
            expect(textoPrecioListItem(component,'corteMin')).toEqual('$200.00');
            assertExistenTodosLosListItemsYSusRespectivasDescripcionesYPrecios(component, servicios);
        });
    });
});

const existeListItem = (component, id) => component.find(`#list_item_${id}`).exists();
const textoDescripcionListItem = (component, id) => component.find(`#checkbox-list-label-${id}-text`).prop('primary');
const textoPrecioListItem = (component, id) => component.find(`#checkbox-list-label-${id}-text-price`).prop('primary');

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