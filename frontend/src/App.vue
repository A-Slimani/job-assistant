<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const router = useRouter()

const routeNames = router.getRoutes()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <h1 class="text-xl font-bold">Job Tracker</h1>
          <div class="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem v-for="route in routeNames" :key="route.path">
                  <NavigationMenuLink
                    @click.prevent="navigateTo(route.path)"
                    :class="[navigationMenuTriggerStyle(), 'cursor-pointer']"
                  >
                    {{ route.name }}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>
    </header>
    <ScrollArea class="flex-1">
      <main class="container mx-auto px-4 py-6 flex flex-col items-center">
        <router-view></router-view>
      </main>
    </ScrollArea>
  </div>
</template>
