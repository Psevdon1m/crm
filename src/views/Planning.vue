<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{info.bill | currency('UAH')}}</h4>
        </div>
        
        <Loader v-if="loading" />

        <p class="center" v-else-if="!categories.length"> Категории пока нет. <router-link to="/categories"> Добавить новую категорию </router-link> </p>

        <section v-else>
            <div v-for="category in categories"
            :key="category.id">
            <p>
                <strong>{{category.title}}:</strong>
                {{category.spend}} из {{category.limit}}
            </p>
            <div class="progress" v-tooltip="category.tooltip" >
                <div
                    class="determinate"
                    :class="category.progressColor"
                    :style="{width: category.progressPercent + '%'}"
                ></div>
            </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
    name: 'planning',
    data: () => ({
        loading: true,
        categories: []
    }),

    async mounted() {
        const records = await this.$store.dispatch('fetchRecords');
        const categories = await this.$store.dispatch('fetchCategories');


        this.categories = categories.map(category => {
            const spend = records.filter(el => el.categoryId === category.id).filter(el => el.type === 'outcome').reduce((total, record )=> {
                return total += Number.parseFloat(record.amount)
            }, 0);


            const percent = 100 * spend / category.limit;

            const progressPercent = percent > 100 ? 100 : percent;
            const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';

            const tooltipValue = category.limit - spend
            const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
            return {
                ...category,
                progressPercent,
                progressColor,
                spend,
                tooltip
            }
        })
        this.loading = false;
    },
    computed: {
        ...mapGetters(['info'])
    }
}
</script>