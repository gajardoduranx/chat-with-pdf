<script>
    import {
        appStatus,
        setAppStatusChatMode,
        setAppStatusError,
        setAppStatusLoading,
    } from "../store";
    import Dropzone from "svelte-file-dropzone";

    let files = {
        accepted: [],
        rejected: [],
    };

    async function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        console.log({ acceptedFiles, fileRejections });
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];

        if (acceptedFiles.length > 0) {
            setAppStatusLoading();
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);

            const res = await fetch("api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                setAppStatusError();
                return;
            }

            const { id, url, pages } = await res.json();
            console.log({ id, url, pages })
            setAppStatusChatMode({ id, url, pages });
        }
    }
</script>

{#if files.accepted.length === 0}
    <Dropzone
        accept="application/pdf"
        on:drop={handleFilesSelect}
        multiple={false}>Arrastra y suelta aquí tu PDF</Dropzone
    >
{/if}

<ol>
    {#each files.accepted as item}
        <li>{item.name}</li>
    {/each}
</ol>
