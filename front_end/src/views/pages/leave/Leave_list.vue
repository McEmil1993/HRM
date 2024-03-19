<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import LeaveListData from '@/service/LeaveListData';
import { ref, onBeforeMount, onMounted } from 'vue';

const product = ref({});
const submitted = ref(false);
const leavelistAddDialog = ref(false);
const leavelistUpdateDialog = ref(false);
const displayConfirmation = ref(false);

const data1 = ref(null);
const filters1 = ref(null);

const leavelistData = new LeaveListData();
const dates = ref();

onBeforeMount(() => {
    leavelistData.getLeaveListData().then((data) => {
        data1.value = data;
    });

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'employees_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        employee_type: { value: null, matchMode: FilterMatchMode.IN },
        position: { value: null, matchMode: FilterMatchMode.IN },
        leave_types: { value: null, matchMode: FilterMatchMode.IN }
    };
};

const filterData = new LeaveListData();

onMounted(() => {
    filterData.getLeaveListData().then((data) => (filter.value = data));
});

const openAddDialog = () => {
    product.value = {};
    submitted.value = false;
    leavelistAddDialog.value = true;
};

const hideAddDialog = () => {
    leavelistAddDialog.value = false;
    submitted.value = false;
};


const saveLeave = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            product.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            product.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        leavelistAddDialog.value = false;
        product.value = {};
    }
};
const openUpdateDialog = () => {
    product.value = {};
    submitted.value = false;
    leavelistUpdateDialog.value = true;
};

const hideUpdateDialog = () => {
    leavelistUpdateDialog.value = false;
    submitted.value = false;
};

const updateLeave = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            product.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            product.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        leavelistUpdateDialog.value = false;
        product.value = {};
    }
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
                <h5>Leave Management | Leave List</h5>
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
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-plus-circle" label="Add" 
                                class="p-button p-component p-button-success p-button-rounded" @click="openAddDialog"/>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
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
                    <Column header="Employee Type" filterField="employee_type" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.employee_type }}</span>
                        </template>
                    </Column>
                    <Column header="Position" filterField="position" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.position }}</span>
                        </template>
                    </Column>
                    <Column header="Leave Type" filterField="leave_types" style="min-width: 10rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.leave_types }}</span>
                        </template>
                    </Column>
                    <Column field="leave_entitlements" header="Leave Entitlement" :filterMenuStyle="{ width: '14rem' }" style="min-width: .5rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.leave_entitlements }}</span>
                        </template>
                    </Column>
                    <Column field="number_of_days" header="Number of Days on Leave" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.number_of_days }}</span>
                        </template>
                    </Column>
                    <Column field="number_of_credits" header="Credits" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.number_of_credits }}</span>
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">
                                <Button type="button" icon="pi pi-pencil" 
                                    class="p-button p-component p-button-rounded p-button-info mr-2 mb-2" @click="openUpdateDialog"/>
                                <Button type="button" icon="pi pi-trash" 
                                    class="p-button p-component p-button-rounded p-button-danger mr-2 mb-2" @click="openConfirmation"/>
                            </span>
                        </template>
                    </Column>
                </DataTable>
                <!-- End of Table to display data -->

                <!-- Add Dialog -->
                <Dialog v-model:visible="leavelistAddDialog" :style="{ width: '1000px' }" header="Leave List" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <span class="p-input-icon-right">
                                <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" type="text" placeholder="Search ID/Fullname">
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="fullname">Fullname</label>
                            <InputText id="fullname" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">fullname is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="position">Position</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Position is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="type">Employee Type</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Type is required.</small>
                        </div>
                        <div class="col-12 md:col-6">
                            <label for="leave">Leave Type</label>
                            <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="leave_type" placeholder="Select Leave Type" :filter="true">
                                <template #value="slotProps">
                                    <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                                        <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                        <div>{{ option.name }}</div>
                                    </div>
                                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                                        <label>Select Leave Type</label>
                                    </template>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </MultiSelect>
                        </div>
                        <div class="col-12 md:col-6">
                            <label for="leave_entitlement">Leave Entitlement</label>
                            <InputText disabled id="leave_entitlement" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" />
                        </div>
                        <div class="col-12 md:col-6">
                            <label for="days_of_leave">Number of Days on Leave</label>
                            <InputText id="days_of_leave" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" />
                        </div>
                        <div class="col-12 md:col-6">
                            <label>Date Start - Date End:</label>
                            <Calendar v-model="dates" selectionMode="range" :manualInput="false"/>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideAddDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveLeave" />
                    </template>
                </Dialog>
                <!-- End of Add Dialog -->

                <!-- Update Dialog -->
                <Dialog v-model:visible="leavelistUpdateDialog" :style="{ width: '1000px' }" header="Update Leave List" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <span class="p-input-icon-right">
                                <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" type="text" placeholder="Search ID/Fullname">
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="fullname">Fullname</label>
                            <InputText id="fullname" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">fullname is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="position">Position</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Position is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="type">Employee Type</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Type is required.</small>
                        </div>
                        <div class="col-12 md:col-6">
                            <label for="leave">Leave Type</label>
                            <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="leave_type" placeholder="Select Leave Type" :filter="true">
                                <template #value="slotProps">
                                    <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                                        <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                        <div>{{ option.name }}</div>
                                    </div>
                                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                                        <label>Select Leave Type</label>
                                    </template>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </MultiSelect>
                        </div>
                        <div class="col-12 md:col-6">
                            <label for="leave_entitlement">Leave Entitlement</label>
                            <InputText disabled id="leave_entitlement" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" />
                        </div>
                        <div class="col-12 md:col-6">
                            <label for="days_of_leave">Number of Days on Leave</label>
                            <InputText id="days_of_leave" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" />
                        </div>
                        <div class="col-12 md:col-6">
                            <label>Date Start - Date End:</label>
                            <Calendar v-model="dates" selectionMode="range" :manualInput="false"/>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideUpdateDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateLeave" />
                    </template>
                </Dialog>
                <!-- End of Update Dialog -->

                <!-- Delete Dialog -->
                <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Are you sure you want to proceed?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
                    </template>
                </Dialog>
                <!--End of Delete Dialog -->

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>