<script setup lang="ts">
const rows = [
  {
    name: 'Leanne Graham',
    username: 'Bret',
    website: 'hildegard.org',
  },
  {
    name: 'Ervin Howell',
    username: 'Antonette',
    website: 'anastasia.net',
  },
  {
    name: 'Clementine Bauch',
    username: 'Samantha',
    website: 'ramiro.info',
  },
  {
    name: 'Patricia Lebsack',
    username: 'Karianne',
    website: 'kale.biz',
  },
  {
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    website: 'demarco.info',
  },
]
</script>

<template>
  <ATable
    :rows="rows"
    search
  />
</template>
