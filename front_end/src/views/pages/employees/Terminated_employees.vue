<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import EmployeesFilteringData from '@/service/EmployeesFilteringData';
import TerminatedEmployees from '@/service/TerminatedEmployees';
import { ref, onBeforeMount, onMounted } from 'vue';

const data1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);


const terminatedData = new TerminatedEmployees();

onBeforeMount(() => {
    terminatedData.getTerminate().then((data) => {
        data1.value = data;
        loading1.value = false;
    });
    loading2.value = false;

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'employees_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        position: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    };
};

const filter = ref([
    { name: 'Engineering'},
    { name: 'Welder'},
    { name: 'Architect'}
]);
// const value1 = ref(null);
const filterData = new EmployeesFilteringData();

onMounted(() => {
    filterData.getEmployeesFilteringData().then((data) => (filter.value = data));
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Employees Management | Terminated Employees</h5>
                <DataTable
                    :value="data1"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    v-model:filters="filters1"
                    filterDisplay="menu"
                    :loading="loading1"
                    :filters="filters1"
                    responsiveLayout="scroll">
                    <template #header>
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
                    <Column field="position" header="Position" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.position }}</span>
                        </template>
                    </Column>
                    <Column header="Reason of being Terminated" style="min-width: 3rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.reason }}</span>
                        </template>
                    </Column>
                    <Column header="Date Terminated" style="min-width: 3rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.date_terminated }}</span>
                        </template>
                    </Column>
                    <Column header="Status" bodyClass="text-center" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">
                                <Button type="button"  icon="pi pi-ban" label="terminated"class="p-button p-component p-button-danger mr-2 mb-2" disabled/>
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>