<script>
	import { Alert } from "flowbite-svelte";
	import { appStatus, APP_STATUS } from "../store.ts";
    import StepLoading from "./StepLoading.svelte";
    import StepChat from "./StepChat.svelte";
	import StepUpload from './StepUpload.svelte'
</script>

{#if $appStatus === APP_STATUS.INIT}
	<StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
	<StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
	<Alert class="text-center">
		<span class="font-medium">Algo malo ha pasado</span>
		Hay un error en la aplicación
	</Alert>
{:else if $appStatus === APP_STATUS.CHAT_MODE}
	<StepChat />
{:else}
	<Alert class="text-center">
		<span class="font-medium">Acción no reconocida</span>
		El estado no es reconocido
	</Alert>
{/if}

