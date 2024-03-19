<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import EmployeesData from '@/service/EmployeesData';
import EmployeesFilteringData from '@/service/EmployeesFilteringData';
import ProductService from '@/service/ProductService';
import { ref, onBeforeMount, onMounted } from 'vue';

const product = ref({});
const submitted = ref(false);

const data1 = ref(null);
const employeesAddDialog = ref(false);
const employeesUpdateDialog = ref(false);
const employeesViewDialog = ref(false);
const displayConfirmation = ref(false);
const filters1 = ref(null);

const productService = new ProductService();
const employeesData = new EmployeesData();

onBeforeMount(() => {
    employeesData.getEmployeesData().then((data) => {
        data1.value = data;
    });

    initFilters1();
});

onMounted(() => {
    productService.getProducts().then((data) => (products.value = data));
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'employees_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        type: { value: null, matchMode: FilterMatchMode.IN },
        position: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    };
};

const filter1 = ref([
    { name: 'Position'},
    { name: 'Employee Type'}
]);
const value1 = ref(null);
const value2 = ref(null);
const filterData = new EmployeesFilteringData();

onMounted(() => {
    filterData.getEmployeesFilteringData().then((data) => (filter1.value = data));
});

const openAddDialog = () => {
    product.value = {};
    submitted.value = false;
    employeesAddDialog.value = true;
};

const hideAddDialog = () => {
    employeesAddDialog.value = false;
    submitted.value = false;
};

const saveEmployee = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        employeesAddDialog.value = false;
        product.value = {};
    }
};

const openUpdateDialog = () => {
    product.value = {};
    submitted.value = false;
    employeesUpdateDialog.value = true;
};

const hideUpdateDialog = () => {
    employeesUpdateDialog.value = false;
    submitted.value = false;
};

const updateEmployee = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        employeesUpdateDialog.value = false;
        product.value = {};
    }
};

const openViewDialog = () => {
    product.value = {};
    submitted.value = false;
    employeesViewDialog.value = true;
};

const hideViewDialog = () => {
    employeesViewDialog.value = false;
    submitted.value = false;
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <h5>Employees Management | Employees List</h5>
                <div class="grid p-fluid pt-3">
                    <div class="field col-6 md:col-4">
                        <span class="p-float-label">
                            <Dropdown id="dropdown" :options="filter1" v-model="value1" optionLabel="name"></Dropdown>
                            <label for="dropdown">Filtering Option</label>
                        </span>
                    </div>
                    <div class="field col-6 md:col-4">
                        <span class="p-float-label">
                            <Dropdown id="dropdown" :options="filter" v-model="value2" optionLabel="name"></Dropdown>
                            <label for="dropdown">Filtering Option</label>
                        </span>
                    </div>
                </div>
                
                <!-- Table to display data -->
                <DataTable
                    :value="data1"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    v-model:filters="filters1"
                    filterDisplay="menu"
                    :filters="filters1"
                    responsiveLayout="scroll">
                    <template 
                        #header
                        v-slot:start
                    >
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-plus-circle" label="Add Employee" 
                                class="p-button p-component p-button-success p-button-rounded" @click="openAddDialog"/>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search"/>
                                <InputText v-model="filters1['global'].value" placeholder="Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> Result not found. </template>
                    <Column field="id" header="ID No." style="min-width: 4rem">
                        <template #body="{ data }">
                            {{ data.id }}
                        </template>
                    </Column>
                    <Column header="Employees Name" filterField="employees_name" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.employees_name }}</span>
                        </template>
                    </Column>
                    <Column header="Type" filterField="type" style="min-width: 10rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.type }}</span>
                        </template>
                    </Column>
                    <Column field="position" header="Position" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.position }}</span>
                        </template>
                    </Column>
                    <Column field="status" header="Status" style="min-width: 3rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.status }}</span>
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">
                                <Button type="button" icon="pi pi-eye" label="view" 
                                    class="p-button p-component p-button-rounded p-button-warning mr-2 mb-2" @click="openViewDialog"/>
                                <Button type="button" icon="pi pi-pencil" label="edit" 
                                    class="p-button p-component p-button-rounded p-button-info mr-2 mb-2" @click="openUpdateDialog"/>
                                <Button type="button" icon="pi pi-ban" label="terminate" 
                                    class="p-button p-component p-button-rounded p-button-danger mr-2 mb-2" @click="openConfirmation"/>
                            </span>
                        </template>
                    </Column>
                </DataTable>
                <!-- End of Table to display data -->

                <!-- Add Dialog -->
                <Dialog v-model:visible="employeesAddDialog" :style="{ width: '1500px' }" header="Add Employee" :modal="true" class="p-fluid">
                    <!-- Personal Information Fieldset -->
                    <Fieldset legend="Personal Information" class="mb-2">
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="bloodtype">Bloodtype</label>
                                <InputText id="bloodtype" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Bloodtype is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="gender">Gender</label>
                                <Dropdown id="gender" v-model="product.inventoryStatus" optionLabel="label" placeholder="Male">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="position">Position</label>
                                <Dropdown id="position" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Position">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="type">Employee Type</label>
                                <Dropdown id="type" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Type">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="rate">Rate</label>
                                <InputText id="rate" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Rate is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="sss">SSS</label>
                                <InputText id="sss" v-model.trim="product.name"/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="tin">TIN</label>
                                <InputText id="tin" v-model.trim="product.name"/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="pagibig">PAG-IBIG</label>
                                <InputText id="pagibig" v-model.trim="product.name"/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="philheath">PhilHealth</label>
                                <InputText id="philheath" v-model.trim="product.name"/>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Personal Information Fieldset -->

                    <!-- Family Background Fieldset-->
                    <Fieldset legend="Family Background" class="mb-2">
                        <h5 for="father">Fathers Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Occupation is required.</small>
                            </div>
                        </div>

                        <h5 for="father">Mothers Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Occupation is required.</small>
                            </div>
                        </div>

                        <h5 for="father">Spouse Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Occupation is required.</small>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Family Background Fieldset -->

                    <!-- Educational Background Fieldset-->
                    <Fieldset legend="Educational Background" class="mb-2">
                        <h5 for="father">Primary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name"/>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name"/>
                            </div>
                        </div>
                        <h5 for="father">Secondary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name"/>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name"/>
                            </div>
                        </div>
                        <h5 for="father">Tertiary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name"/>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name"/>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Educational Background Fieldset -->

                    <!-- Work Experience Fieldset-->
                    <Fieldset legend="Work Experience" class="mb-2">
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="company_name">Company Name</label>
                                <Textarea id="company_name" rows="2" cols="10"></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="work_positions">Works/Positions</label>
                                <Textarea inputId="work_positions" rows="2" cols="10"></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="skills">Skills</label>
                                <Textarea inputId="skills" rows="2" cols="10"></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="skills">Years of Experience</label>
                                <Textarea inputId="year_of_experience" rows="2" cols="10"></Textarea>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Work Experience Fieldset -->

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideAddDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveEmployee" />
                    </template>
                </Dialog>
                <!-- End of Add Dialog -->

                <!-- Update Dialog -->
                <Dialog v-model:visible="employeesUpdateDialog" :style="{ width: '1500px' }" header="Update Employee" :modal="true" class="p-fluid">
                    <!-- Personal Information Fieldset -->
                    <Fieldset legend="Personal Information" class="mb-2">
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true" :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="bloodtype">Bloodtype</label>
                                <InputText id="bloodtype" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Bloodtype is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="gender">Gender</label>
                                <Dropdown id="gender" v-model="product.inventoryStatus" optionLabel="label" placeholder="Male">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="position">Position</label>
                                <Dropdown id="position" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Position">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="type">Employee Type</label>
                                <Dropdown id="type" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Type">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="rate">Rate</label>
                                <InputText id="rate" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Rate is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="sss">SSS</label>
                                <InputText id="sss" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">SSS is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="tin">TIN</label>
                                <InputText id="tin" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">TIN is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="pagibig">PAG-IBIG</label>
                                <InputText id="pagibig" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">PAG-IBIG is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="philheath">PhilHealth</label>
                                <InputText id="philheath" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">PhilHealth is required.</small>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Personal Information Fieldset -->

                    <!-- Family Background Fieldset-->
                    <Fieldset legend="Family Background" class="mb-2">
                        <h5 for="father">Fathers Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Occupation is required.</small>
                            </div>
                        </div>

                        <h5 for="father">Mothers Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Occupation is required.</small>
                            </div>
                        </div>

                        <h5 for="father">Spouse Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Firstname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Birthdate is required.</small>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Age is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Address is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Contact Number is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" required="true"  :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-invalid" v-if="submitted && !product.name">Occupation is required.</small>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Family Background Fieldset -->

                    <!-- Educational Background Fieldset-->
                    <Fieldset legend="Educational Background" class="mb-2">
                        <h5 for="father">Primary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name" />
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name" />
                            </div>
                        </div>
                        <h5 for="father">Secondary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name" />
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name" />
                            </div>
                        </div>
                        <h5 for="father">Tertiary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name" />
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name" />
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Educational Background Fieldset -->

                    <!-- Work Experience Fieldset-->
                    <Fieldset legend="Work Experience" class="mb-2">
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="company_name">Company Name</label>
                                <Textarea id="company_name" rows="2" cols="10"></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="work_positions">Works/Positions</label>
                                <Textarea inputId="work_positions" rows="2" cols="10"></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="skills">Skills</label>
                                <Textarea inputId="skills" rows="2" cols="10"></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="skills">Years of Experience</label>
                                <Textarea inputId="year_of_experience" rows="2" cols="10"></Textarea>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Work Experience Fieldset -->

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideUpdateDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateEmployee" />
                    </template>
                </Dialog>
                <!-- End of Update Dialog -->

                <!-- View Dialog -->
                <Dialog v-model:visible="employeesViewDialog" :style="{ width: '1500px' }" header="View Employee" :modal="true" class="p-fluid">
                    <!-- Personal Information Fieldset -->
                    <Fieldset legend="Personal Information" class="mb-2">
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" disabled/>
                                <small class="p-invalid" v-if="submitted && !product.name">Middlename is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" disabled/>
                                <small class="p-invalid" v-if="submitted && !product.name">Lastname is required.</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="bloodtype">Bloodtype</label>
                                <InputText id="bloodtype" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="gender">Gender</label>
                                <Dropdown id="gender" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Male">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="position">Position</label>
                                <Dropdown id="position" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Select Position">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="type">Employee Type</label>
                                <Dropdown id="type" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Select Type">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="rate">Rate</label>
                                <InputText id="rate" v-model.trim="product.name" disabled />
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="sss">SSS</label>
                                <InputText id="sss" v-model.trim="product.name" disabled />
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="tin">TIN</label>
                                <InputText id="tin" v-model.trim="product.name" disabled />
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="pagibig">PAG-IBIG</label>
                                <InputText id="pagibig" v-model.trim="product.name" disabled />
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="philheath">PhilHealth</label>
                                <InputText id="philheath" v-model.trim="product.name" disabled />
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Personal Information Fieldset -->

                    <!-- Family Background Fieldset-->
                    <Fieldset legend="Family Background" class="mb-2">
                        <h5 for="father">Fathers Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" disabled/>
                            </div>
                        </div>

                        <h5 for="father">Mothers Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" disabled/>
                            </div>
                        </div>

                        <h5 for="father">Spouse Information</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-3">
                                <label for="firstname">Firstname</label>
                                <InputText id="firstname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="middlename">Middlename</label>
                                <InputText id="middlename" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="lastname">Lastname</label>
                                <InputText id="lastname" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="suffix">Suffix</label>
                                <Dropdown id="suffix" v-model="product.inventoryStatus" disabled optionLabel="label" placeholder="Select Suffix">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value && slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                        </div>
                                        <div v-else-if="slotProps.value && !slotProps.value.value">
                                            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-12 md:col-2">
                                <label for="birthdate">Birthdate</label>
                                <InputText type="date" id="birthdate" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-1">
                                <label for="age">Age</label>
                                <InputText type="number" id="age" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="address">Address</label>
                                <InputText id="address" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="contact_number">Contact Number</label>
                                <InputText type="number" id="contact_number" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="occupation">Occupation</label>
                                <InputText id="occupation" v-model.trim="product.name" disabled/>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Family Background Fieldset -->

                    <!-- Educational Background Fieldset-->
                    <Fieldset legend="Educational Background" class="mb-2">
                        <h5 for="father">Primary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name" disabled/>
                            </div>
                        </div>
                        <h5 for="father">Secondary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name" disabled/>
                            </div>
                        </div>
                        <h5 for="father">Tertiary</h5>
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="school_name">School Name</label>
                                <InputText id="school_name" v-model.trim="product.name" disabled/>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="year_attended">Year Attended</label>
                                <InputText id="year_attended" v-model.trim="product.name" disabled/>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Educational Background Fieldset -->

                    <!-- Work Experience Fieldset-->
                    <Fieldset legend="Work Experience" class="mb-2">
                        <div class="grid p-fluid">
                            <div class="field col-12 md:col-6">
                                <label for="company_name">Company Name</label>
                                <Textarea id="company_name" rows="2" cols="10" disabled></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="work_positions">Works/Positions</label>
                                <Textarea inputId="work_positions" rows="2" cols="10" disabled></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="skills">Skills</label>
                                <Textarea inputId="skills" rows="2" cols="10" disabled></Textarea>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="skills">Years of Experience</label>
                                <Textarea inputId="year_of_experience" rows="2" cols="10" disabled></Textarea>
                            </div>
                        </div>
                    </Fieldset>
                    <!-- End of Work Experience Fieldset -->
                </Dialog>
                <!-- End of View Dialog -->

                <!-- Delete Dialog -->
                <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Terminate this employee?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" />
                    </template>
                </Dialog>
                <!--End of Delete Dialog -->

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>