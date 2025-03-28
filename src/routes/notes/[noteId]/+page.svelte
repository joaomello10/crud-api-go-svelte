<script>
    export let data;

    import { Button } from "$lib/components/ui/button/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { onMount, onDestroy } from "svelte";
    import Header from "$lib/components/app/Header.svelte";
    import { Title } from "$lib/components/ui/dialog/index.js";
    import { goto } from "$app/navigation";
    let titleInput = "";
    let bodyInput = "";
    export let key = 0;
    let state = false;
    const spinSvg = `<svg class="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    function saveNote() {
        state = true;
        console.log(titleInput);
        fetch(`http://localhost:8080/notes/${data.ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Title: titleInput,
                Body: bodyInput,
            }),
        })
            .then((response) => response.json())
            .then((data2) => {
                goto("/");
            })
            .catch((error) => console.error("Error:", error));
    }

    function resetComponent() {
        key++;
    }

    setTimeout(() => {
        resetComponent();
        titleInput = data.Title;
        bodyInput = data.Body;
    });
</script>

<Header></Header>

<Button class="mt-5" variant="destructive" href="/">Exit</Button>
{#key key}
    <div class="grid w-full gap-2 mt-5">
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="title">Title</Label>
            <Input
                type="title"
                id="title"
                placeholder="title"
                bind:value={titleInput}
            />
        </div>
        <Label for="body">Content</Label>
        <Textarea
            id="body"
            bind:value={bodyInput}
            class=" h-80  resize-none"
            placeholder="Type your note here."
        />

        {#if state}
            <Button
                disabled={state}
                onclick={() => saveNote(titleInput, bodyInput)}
                >{@html spinSvg} Saving</Button
            >
        {:else}
            <Button disabled={state} onclick={() => saveNote()}>Save</Button>
        {/if}
    </div>
{/key}
