<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import EmployeesData from '@/service/EmployeesData';
import EmployeesFilteringData from '@/service/EmployeesFilteringData';
import { ref, onBeforeMount, onMounted } from 'vue';

const data1 = ref(null);
const filters1 = ref(null);

const product = ref({});
const submitted = ref(false);
const productViewDialog = ref(false);
// const productUpdateDialog = ref(false);
const displayConfirmation = ref(false);


const employeesData = new EmployeesData();

onBeforeMount(() => {
    employeesData.getEmployeesData().then((data) => {
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

const openViewPayroll = () => {
    product.value = {};
    submitted.value = false;
    productViewDialog.value = true;
};

const hideViewDialog = () => {
    productViewDialog.value = false;
    submitted.value = false;
};

const savePayroll = () => {
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
                <h5>Payroll Management</h5>
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
                        <div class="flex justify-content-between flex-column">
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
                    <Column field="status" header="Status" style="min-width: 3rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.status }}</span>
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">
                                <Button type="button" icon="pi pi-eye" 
                                    class="p-button p-component p-button-rounded p-button-warning mr-2 mb-2" @click="openViewPayroll"/>
                                <!-- <Button type="button" icon="pi pi-pencil" 
                                    class="p-button p-component p-button-rounded p-button-info mr-2 mb-2" @click="openUpdateDialog"/> -->
                                <Button type="button" icon="pi pi-trash" 
                                    class="p-button p-component p-button-rounded p-button-danger mr-1 mb-2" @click="openConfirmation"/>
                            </span>
                        </template>
                    </Column>
                </DataTable>
                <!-- End of Table to display data -->

                <!-- View Dialog -->
                <Dialog v-model:visible="productViewDialog" :style="{ width: '50%' }" :modal="true" class="p-fluid p-dialog-header1">
                    <div class="dtr p-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="dailytimerecord">Payslip for the month of (Specific Month 2024)</div>
                            </div>
                            <div class="top_info">
                                <div class="ename_month">
                                    <div class="e_name_month">
                                        <h5 for="emp_name">Name of Employee : </h5>
                                        <span class="text-success ml-2"> Janine Tulid</span>
                                    </div>
                                    <div class="e_name_month">
                                        <h5 for="emp_name">Pay Run Period: </h5>
                                        <span class="text-success ml-2"> 01/01/2024 - 01/14/2024</span>
                                    </div>
                                </div>
                                <div class="ename_month">
                                    <div class="e_name_month">
                                        <h5 for="emp_name">Pag-IBIG No. : </h5>
                                        <span class="text-success ml-2"> 123465794215</span>
                                    </div>
                                    <div class="e_name_month">
                                        <h5 for="emp_name">TIN: </h5>
                                        <span class="text-success ml-2"> N/A </span>
                                    </div>
                                </div>
                                <div class="ename_month">
                                    <div class="e_name_month">
                                        <h5 for="emp_name">SSS No. : </h5>
                                        <span class="text-success ml-2"> 123465794215</span>
                                    </div>
                                    <div class="e_name_month">
                                        <h5 for="emp_name">Philhealth No. : </h5>
                                        <span class="text-success ml-2"> N/A </span>
                                    </div>
                                </div>
                            </div>
                            <table class="payslip_content">
                                <thead class="payslip_content_head">
                                    <th class="th">
                                        Earnings
                                    </th>
                        
                                    <th class="th">
                                        Amount
                                    </th>
                             
                                    <th class="th">
                                        Deduction
                                    </th>
                    
                                    <th class="th">
                                        Amount
                                    </th>
                                </thead>
                                <tbody>
                                    <tr class="tr">
                                        <td class="td">
                                            Basic Salary
                                        </td>
                                        <td class="td">
                                            P5,000
                                        </td>
                                        <td class="td">
                                            Late In/Undertime
                                        </td>
                                        <td class="td">
                                            -
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            Salary Loan / Cash Advance
                                        </td>
                                        <td class="td">
                                            -
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            Leave w/o pay
                                        </td>
                                        <td class="td">
                                            -
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            TIN
                                        </td>
                                        <td class="td">
                                            -
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            SSS
                                        </td>
                                        <td class="td">
                                            P100
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            Philhealth
                                        </td>
                                        <td class="td">
                                            -
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            
                                        </td>
                                        <td class="td">
                                            Pag-IBIG
                                        </td>
                                        <td class="td">
                                            P50
                                        </td>
                                    </tr>
                                    <tr class="tr">
                                        <td class="td">
                                            Total Earnings
                                        </td>
                                        <td class="td">
                                            P5,000
                                        </td>
                                        <td class="td">
                                            Total Deduction
                                        </td>
                                        <td class="td">
                                            P150
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="payslip_content_footer">
                                <div class="div">
                                    <div class="datas">
                                        Name of Employee
                                    </div>
                                    <div class="datas">
                                        Janine Tulid
                                    </div>
                                </div>
                                <div class="div">
                                    <div class="datas">
                                        Salary
                                    </div>
                                    <div class="datas">
                                        P10,000
                                    </div>
                                </div>
                                <div class="div">
                                    <div class="datas">
                                        Allowances
                                    </div>
                                    <div class="datas">
                                        P4,000
                                    </div>
                                </div>
                                <div class="div">
                                    <div class="datas">
                                    Total Salary
                                </div>
                                <div class="datas">
                                    P14,000
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="generated_payslip_txt">
                        Generated Payslip
                    </div>
                    <template #footer>
                        <Button type="button" label="Export" icon="pi pi-fw pi-file layout-menuitem-icon" badgeSeverity="contrast" outlined @click="downloadData"/>
                    </template>
                </Dialog><!-- End of View Dialog -->   

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

<style lang="scss" scoped src="./Payroll_management.scss"></style>