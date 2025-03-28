<script>
    import "../app.css";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    let { children } = $props();
</script>

<Toaster />
<div class="m-10">
    {@render children?.()}
</div>
