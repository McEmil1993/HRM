<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import LeaveData from '@/service/LeaveData';
import { ref, onBeforeMount} from 'vue';

const product = ref({});
const submitted = ref(false);
const leaveAddDialog = ref(false);
const leaveUpdateDialog = ref(false);
const displayConfirmation = ref(false);

const data1 = ref(null);
const filters1 = ref(null);


const leaveData = new LeaveData();

onBeforeMount(() => {
    leaveData.getLeaveData().then((data) => {
        data1.value = data;
    });

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        leave_type: { value: null, matchMode: FilterMatchMode.IN },
        leave_entitlement: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    };
};

const openAddDialog = () => {
    product.value = {};
    submitted.value = false;
    leaveAddDialog.value = true;
};

const hideAddDialog = () => {
    leaveAddDialog.value = false;
    submitted.value = false;
};


const saveViolation = () => {
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
        leaveAddDialog.value = false;
        product.value = {};
    }
};

const openUpdateDialog = () => {
    product.value = {};
    submitted.value = false;
    leaveUpdateDialog.value = true;
};

const hideUpdateDialog = () => {
    leaveUpdateDialog.value = false;
    submitted.value = false;
};


const updateViolation = () => {
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
        leaveAddDialog.value = false;
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
                <h5>Leave Management | Leave Type</h5>
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
                            <Button type="button" icon="pi pi-plus-circle" label="Create New" 
                                class="p-button p-component p-button-success p-button-rounded" @click="openAddDialog"/>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> Result not found. </template>
                    <Column header="Type" filterField="leave_type" style="min-width: 10rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.leave_type }}</span>
                        </template>
                    </Column>
                    <Column field="leave_entitlement" header="Entitlement" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.leave_entitlement }}</span>
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
                <Dialog v-model:visible="leaveAddDialog" :style="{ width: '500px' }" header="New Leave Type" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <label for="leave_type">Leave Type</label>
                            <InputText id="leave_type" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Leave Type is required.</small>
                        </div>
                        <div class="col-12">
                            <label for="leave_entitlement">Leave Entitlement</label>
                            <Dropdown id="leave_entitlement" v-model="product.inventoryStatus" optionLabel="label" placeholder="Choose leave entitlement">
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
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideAddDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveViolation"/>
                    </template>
                </Dialog>
                <!-- End of Add Dialog -->

                <!-- Update Dialog -->
                <Dialog v-model:visible="leaveUpdateDialog" :style="{ width: '500px' }" header="Update Leave Type" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <label for="leave_type">Leave Type</label>
                            <InputText id="leave_type" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Leave Type is required.</small>
                        </div>
                        <div class="col-12">
                            <label for="leave_entitlement">Leave Entitlement</label>
                            <Dropdown id="leave_entitlement" v-model="product.inventoryStatus" optionLabel="label" placeholder="Choose leave entitlement">
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
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideUpdateDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateViolation"/>
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