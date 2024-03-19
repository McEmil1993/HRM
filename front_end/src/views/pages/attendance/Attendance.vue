

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Attendance Management</h5>
                <div class="grid1 p-fluid">
                    <div class="grid1  p-fluid">
                        <div class="field col-12 lg:col-4 mr-5">
                            <Button type="button" icon="pi pi-plus-circle" label="Create Shift" class="p-button p-component p-button-success p-button-rounded" 
                            @click="openAddDialog" />
                        </div>
                        <div class="field col-12 lg:col-12 ml-5">
                            <h6>Daterange:</h6>
                            <Calendar v-model="dates" selectionMode="range" :manualInput="false"/>
                        </div>
                        <div class="field col-12 lg:col-12">
                            <h6>Filter Option:</h6>
                            <span class="p-float-label">
                                <Dropdown id="dropdown" :options="filter" v-model="value1" optionLabel="name"></Dropdown>
                                <label for="dropdown">Select Position</label>
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div class="pb-2">
                    <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" 
                    :multiple="true" accept="image/*" chooseLabel="Upload Timesheet" :maxFileSize="1000000"></FileUpload>
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
                    <template #header>
                        <div class="flex justify-content-between flex-column">
                            <div class="p-input-icon-left mb-2" v-if="filters1">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Search" style="width: 100%" />
                            </div>
                            <div class="p-input-icon-left mb-2" v-else>
                                <i class="pi pi-search" />
                                <InputText  placeholder="Search" style="width: 100%" />
                            </div>
                        </div>
                    </template>
                    <template #empty> Result not found. </template>
                    <Column header="Date" filterField="date" style="min-width: 1rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.date }}</span>
                        </template>
                    </Column>
                    <Column header="Day" filterField="day" style="min-width: 1rem">
                        <template #body="">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">Monday,Tuesday,Wednesday</span>
                        </template>
                    </Column>
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
                    <Column field="position" header="Position" :filterMenuStyle="{ width: '14rem' }" style="min-width:2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.position }}</span>
                        </template>
                    </Column>
                    <Column field="shift" header="Shift" :filterMenuStyle="{ width: '14rem' }" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.shift }}</span>
                        </template>
                    </Column>
                    <Column header="Time Shift" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.timeshift }}</span>
                        </template>
                    </Column>
                    <Column header="Time-in" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.time_in }}</span>
                        </template>
                    </Column>
                    <Column header="Time-out" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.time_out }}</span>
                        </template>
                    </Column>
                    <Column header="Approved OT?" style="min-width: 2rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.approvedOT }}</span>
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">
                                <Button type="button" icon="pi pi-eye" label="View DTR" 
                                    class="p-button p-component p-button-rounded p-button-warning mr-2 mb-2" @click="openviewDTR"/>
                            </span>
                        </template>
                    </Column>
                </DataTable>
                <!-- End of Table to display data -->

                <!-- Add Shift Dialog -->
                <Dialog v-model:visible="shiftAddDialog" :style="{ width: '500px' }" header="Create Shift" :modal="true" class="p-fluid">
                    <div class="grid p-fluid">
                        <div class="col-12">
                            <span class="p-input-icon-right">
                                <input class="p-inputtext p-component" data-pc-name="inputtext" autofocus data-pc-section="root" type="text" placeholder="Search ID/Fullname">
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                        <div class="col-12">
                            <label for="fullname">Employee Name: </label>
                            <InputText id="fullname" v-model.trim="product.name" disabled/>
                        </div>
                        <div class="col-12">
                            <label for="position">Position: </label>
                            <InputText id="position" v-model.trim="product.name" disabled/>
                        </div>
                        <div class="col-12">
                            <label for="type">Employee Type</label>
                            <InputText id="position" v-model.trim="product.name" disabled/>
                        </div>
                        <div class="col-12">
                            <span class="p-float-label">
                                <Dropdown id="dropdown" :options="filter1" v-model="value1" optionLabel="name"></Dropdown>
                                <label for="dropdown">Select Shift</label>
                            </span>
                        </div>
                        <div class="col-12">
                            <label for="timein">Time In</label>
                            <InputText id="timein" v-model.trim="product.name"/>
                        </div>
                        <div class="col-12">
                            <label for="timeout">Time Out</label>
                            <InputText id="timeout" v-model.trim="product.name"/>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideAddDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveShift"/>
                    </template>
                </Dialog>
                <!-- End of Add Shift Dialog -->

                <!-- View DTR Dialog -->
                <Dialog v-model:visible="viewDTRDialog" :style="{ width: '65%' }" :modal="true" class="p-fluid p-dialog-header1">
                    <div class="dtr p-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="dailytimerecord">Daily Time Record</div>
                            </div>
                            <div class="ename_month">
                                <div class="e_name_month">
                                    <h5 for="emp_name">Cut-Off Period: </h5>
                                    <span class="text-success ml-2"> January 1-15 2024</span>
                                </div>
                                <div class="e_name_month">
                                    <h5 for="emp_name">Employee Name: </h5>
                                    <span class="text-success ml-2"> Janine Tulid</span>
                                </div>
                                <div class="e_name_month">
                                    <h5 for="emp_name">Position: </h5>
                                    <span class="text-success ml-2"> Welder</span>
                                </div>
                            </div>
                            <DataTable
                                :value="data1"
                                class="p-datatable-gridlines"
                                :rows="10"
                                dataKey="id"
                                :rowHover="true"
                                v-model:filters="filters1"
                                filterDisplay="menu"
                                :filters="filters1"
                                responsiveLayout="scroll">
                                <Column header="Date" filterField="date" style="min-width: 1rem">
                                    <template #body="">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">01/01/2024</span>
                                    </template>
                                </Column>
                                <Column header="Day" filterField="day" style="min-width: 1rem">
                                    <template #body="">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">Monday,Tuesday,Wednesday</span>
                                    </template>
                                </Column>
                                <Column field="id" header="ID No." style="min-width: 4rem">
                                    <template #body="{ data }">
                                        {{ data.id }}
                                    </template>
                                </Column>
                                <Column field="shift" header="Shift" :filterMenuStyle="{ width: '14rem' }" style="min-width: 2rem">
                                    <template #body="{ data }">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.shift }}</span>
                                    </template>
                                </Column>
                                <Column header="Time Shift" style="min-width: 2rem">
                                    <template #body="{ data }">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.timeshift }}</span>
                                    </template>
                                </Column>
                                <Column header="Time-in" style="min-width: 2rem">
                                    <template #body="{ data }">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.time_in }}</span>
                                    </template>
                                </Column>
                                <Column header="Time-out" style="min-width: 2rem">
                                    <template #body="{ data }">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.time_out }}</span>
                                    </template>
                                </Column>
                                <Column header="Approved OT?" style="min-width: 1rem">
                                    <template #body="{ data }">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.approvedOT }}</span>
                                    </template>
                                </Column>
                                <Column header="Time-in" style="min-width: 2rem">
                                    <template #body="">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">8:00 PM</span>
                                    </template>
                                </Column>
                                <Column header="Time-out" style="min-width: 2rem">
                                    <template #body="">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">9:12 PM</span>
                                    </template>
                                </Column>
                                <Column header="Overtime Hours" style="min-width: 2rem">
                                    <template #body="">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">N/A</span>
                                    </template>
                                </Column>
                            </DataTable><!-- End of Table to display data -->
                        </div>
                    </div>
                    <div class="result">
                        <div class="col-6">
                            <label for="thl">Total Hours Late: </label>
                            <span class="total_of_hours_late_r text-danger">2 hours</span>
                        </div>
                        <div class="col-6">
                            <label for="thu">Total Hours Undertime: </label>
                            <span class="total_of_hours_undertime_r text-danger">1 hour</span>
                        </div>
                    </div>
                    <template #footer>
                        <Button type="button" label="Download" icon="pi pi-arrow-down" badgeSeverity="contrast" outlined @click="downloadData"/>
                        <!-- <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveShift"/> -->
                    </template>
                </Dialog><!-- End of View DTR Dialog -->   
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped src="./Attendance.scss"></style>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import PositionFilteringData from '@/service/PositionFilteringData';
import ShiftFilteringData from '@/service/ShiftFilteringData';
import Time_In_Out from '@/service/Time_In_Out';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

export default {
    data() {
        return {
            product: {},
            submitted: false,
            data1: null,
            shiftAddDialog: false,
            viewDTRDialog: false,
            filters1: null,
            filter: [
                { name: 'Welder' },
                { name: 'Engineering' },
                { name: 'Steelman' }
            ],
            filter1: [
                { name: 'Morning' },
                { name: 'Night' }
            ],
            value1: null,
            dates: null
        };
    },
    mounted() {
        const timeInOut = new Time_In_Out();
        timeInOut.getTime_In_Out().then((data) => {
            this.data1 = data;
        });

        this.initFilters1();

        const filterData = new PositionFilteringData();
        filterData.getPositionFilteringData().then((data) => {
            this.filter = data;
        });

        const filterShift = new ShiftFilteringData();
        filterShift.getShiftFilteringData().then((data) => {
            this.filter1 = data;
        });
    },
    methods: {
        openAddDialog() {
            this.product = {};
            this.submitted = false;
            this.shiftAddDialog = true;
        },
        hideAddDialog() {
            this.shiftAddDialog = false;
            this.submitted = false;
        },
        saveShift() {
            this.submitted = true;
            if (this.product.name && this.product.name.trim() && this.product.price) {
                if (this.product.id) {
                    this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                    this.product[findIndexById(this.product.id)] = this.product;
                    this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } else {
                    this.product.id = createId();
                    this.product.code = createId();
                    this.product.image = 'product-placeholder.svg';
                    this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                    this.product.push(this.product);
                    this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
                this.shiftAddDialog = false;
                this.product = {};
            }
        },
        openviewDTR() {
            this.product = {};
            this.submitted = false;
            this.viewDTRDialog = true;
        },
        initFilters1() {
            this.filters1 = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'employees_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                position: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
                shift: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
            };
        },
        onAdvancedUpload() {
            this.toast.add({ severity: 'positive', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        downloadData() {
            if (this.data1) {
                const headers = [
                    'Days',
                    'Time In/Out',
                    'Hours of Under Time',
                    'Hours of Late',
                    'Total of Hours'
                ];
                const xlxsData = this.data1.map(row =>
                    headers.map(header => JSON.stringify(row[header])).join(',')
                );
                xlxsData.unshift(headers.join(','));

                const xlxs = xlxsData.join('\n');
                const blob = new Blob([xlxs], { type: 'text/xlxs' });

                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = 'data.xlxs';
                link.click();

                URL.revokeObjectURL(url);
            }
        }
    }
}
</script>