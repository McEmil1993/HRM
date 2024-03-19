<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import PerformanceData from '@/service/PerformanceData';
import EmployeesFilteringData from '@/service/EmployeesFilteringData';
import { ref, onBeforeMount, onMounted } from 'vue';

const data1 = ref(null);
const filters1 = ref(null);

const product = ref({});
const submitted = ref(false);
const productAddDialog = ref(false);
const productViewDialog = ref(false);
const productUpdateDialog = ref(false);
const displayConfirmation = ref(false);


const performanceData = new PerformanceData();

onBeforeMount(() => {
    performanceData.getPerformanceData().then((data) => {
        data1.value = data;
    });

    initFilters1();
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

const filter = ref([
    { name: 'Position'},
    { name: 'Type'}
]);
const filterData = new EmployeesFilteringData();

onMounted(() => {
    filterData.getEmployeesFilteringData().then((data) => (filter.value = data));
});

const openAddDialog = () => {
    product.value = {};
    submitted.value = false;
    productAddDialog.value = true;
};

const hideAddDialog = () => {
    productAddDialog.value = false;
    submitted.value = false;
};

const saveMonitoring = () => {
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
        productAddDialog.value = false;
        product.value = {};
    }
};

const openViewDialog = () =>{
    product.value = {};
    submitted.value = false;
    productViewDialog.value = true;
}

const openUpdateDialog = () => {
    product.value = {};
    submitted.value = false;
    productUpdateDialog.value = true;
};

const hideUpdateDialog = () => {
    productUpdateDialog.value = false;
    submitted.value = false;
};

const updateMonitoring = () => {
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
        productAddDialog.value = false;
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
                <h5>Performance Monitoring</h5>
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
                    <template #header v-slot:start>
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
                    <Column field="count_of_violation" header="Count of Violation" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template>
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{data.count_of_violation}}</span>
                        </template>
                    </Column>
                    <Column field="status" header="Status" style="min-width: 3rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.status }}</span>
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">
                                <Button type="button" icon="pi pi-eye" class="p-button p-component p-button-rounded p-button-warning mr-2 mb-2" @click="openViewDialog"/>
                                <Button type="button" icon="pi pi-pencil" 
                                    class="p-button p-component p-button-rounded p-button-info mr-2 mb-2" @click="openUpdateDialog"/>
                                <Button type="button" icon="pi pi-trash" 
                                    class="p-button p-component p-button-rounded p-button-danger mr-1 mb-2" @click="openConfirmation"/>
                            </span>
                        </template>
                    </Column>
                </DataTable>
                <!-- End of Table to display data -->

                <!-- Add Dialog -->
                <Dialog v-model:visible="productAddDialog" :style="{ width: '1000px' }" header="Create Performance" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <span class="p-input-icon-right">
                                <input class="p-inputtext p-component" data-pc-name="inputtext" autofocus data-pc-section="root" type="text" 
                                placeholder="Search ID/Fullname">
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="fullname">Fullname</label>
                            <InputText id="fullname" v-model.trim="product.name" disabled required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">fullname is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="position">Position</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Position is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="type">Type</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Type is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="violation">Violation</label>
                                <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="violation_name" 
                                    placeholder="Select Violations" :filter="true ">
                                    <template #value="slotProps">
                                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" 
                                            v-for="option of slotProps.value" :key="option.code" >
                                            <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                            <div>{{ option.name }}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            <label>Select Violations</label>
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
                        <div class="col-12 md:col-4">
                            <label for="violation_count">Violation Count</label>
                            <InputText type="number" id="violation_count" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" />
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="date_committed">Date Committed</label>
                            <InputText type="date" id="position" v-model.trim="product.name" required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Date is required.</small>
                        </div>
                        <div class="col-12 md:col-12">
                            <span class="p-float-label">
                                <Textarea inputId="textarea" rows="3" cols="30" v-model="value10"></Textarea>
                                <label for="textarea">Assessment</label>
                            </span>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideAddDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveMonitoring" />
                    </template>
                </Dialog>
                <!-- End of Add Dialog -->

                <!-- Update Dialog -->
                <Dialog v-model:visible="productUpdateDialog" :style="{ width: '1000px' }" header="Update Performance" :modal="true" class="p-fluid">
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
                            <small class="p-invalid" v-if="submitted && !product.name">Fullname is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="position">Position</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Position is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="type">Type</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true"  
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Type is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="violation">Violation</label>
                                <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="violation_name" placeholder="Select Violations" :filter="true">
                                    <template #value="slotProps">
                                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                                            <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                            <div>{{ option.name }}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            <label>Select Violations</label>
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
                        <div class="col-12 md:col-4">
                            <label for="violation_count">Violation Count</label>
                            <InputText type="number" id="violation_count" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" />
                        </div>
                        <div  class="col-12 md:col-4">
                            <label for="date_committed">Date Committed</label>
                            <InputText type="date" id="position" v-model.trim="product.name" required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Date is required.</small>
                        </div>
                        <div class="col-12 md:col-12">
                            <span class="p-float-label">
                                <Textarea inputId="textarea" rows="3" cols="30" v-model="value10"></Textarea>
                                <label for="textarea">Assessment</label>
                            </span>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideUpdateDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateMonitoring" />
                    </template>
                </Dialog>
                <!-- End of Update Dialog -->


                <!-- View Dialog -->
                <Dialog v-model:visible="productViewDialog" :style="{ width: '1000px' }" header="View Performance" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <span class="p-input-icon-right">
                                <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" type="text"
                                 placeholder="Search ID/Fullname" disabled>
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="fullname">Fullname</label>
                            <InputText id="fullname" v-model.trim="product.name" disabled required="true" autofocus 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Fullname is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="position">Position</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Position is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="type">Type</label>
                            <InputText id="position" v-model.trim="product.name" disabled required="true"  
                                :class="{ 'p-invalid': submitted && !product.name }" />
                            <small class="p-invalid" v-if="submitted && !product.name">Type is required.</small>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="violation">Violation</label>
                                <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="violation_name" placeholder="Select Violations" 
                                    :filter="true" disabled>
                                    <template #value="slotProps">
                                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                                            <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                            <div>{{ option.name }}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            <label>Select Violations</label>
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
                        <div class="col-12 md:col-4">
                            <label for="violation_count">Violation Count</label>
                            <InputText type="number" id="violation_count" v-model.trim="product.name" :class="{ 'p-invalid': submitted && !product.name }" disabled/>
                        </div>
                        <div  class="col-12 md:col-4">
                            <label for="date_committed">Date Committed</label>
                            <InputText type="date" id="position" v-model.trim="product.name" required="true" 
                                :class="{ 'p-invalid': submitted && !product.name }" disabled/>
                            <small class="p-invalid" v-if="submitted && !product.name">Date is required.</small>
                        </div>
                        <div class="col-12 md:col-12">
                            <span class="p-float-label">
                                <Textarea inputId="textarea" rows="3" cols="30" v-model="value10" disabled></Textarea>
                                <label for="textarea">Assessment</label>
                            </span>
                        </div>
                    </div>
                </Dialog>
                <!-- End of View Dialog -->



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