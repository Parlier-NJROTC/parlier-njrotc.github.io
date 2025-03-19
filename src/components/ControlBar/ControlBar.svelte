<script lang="ts">
    import data from '../../data/gallery.json'
    import "./ControlBar.less"

    export let CurrentPageNum:number

    let buttons = []

    for(let i = 0;i<data.length;i++){
        buttons.push(data[i].page)
    }

    let NextPage = `/Gallery/Page-${CurrentPageNum+1}`
    let NextDisabled = false
    let PrevPage = `/Gallery/Page-${CurrentPageNum-1}`
    let PrevDisabled = false
    if(CurrentPageNum<=0){
        // hide or removeControlBar-Prev-Link
        PrevPage = ``
        PrevDisabled = true

    }
    if(CurrentPageNum>=buttons.length){
        // hide or remove ControlBar-Next-Link
        NextPage = ``
        NextDisabled = true
    }
</script>

<div id="Control-BackPlate">
        <button id="ControlBar-Previous" disabled={PrevDisabled}>
            <a id="ControlBar-Prev-Link" href={PrevPage} aria-disabled={PrevDisabled}>
                &lt; <br> Previous Page
            </a>
        </button>
    <div id="ControlBar">
        <a href="/Gallery">
            Home
        </a>
        {#each buttons as link}
            <a href={"/Gallery/Page-"+link} id={`ControlBar-Button${link}`}>
                {link}
            </a>
        {/each}
    </div>
        <button id="ControlBar-Next" disabled={NextDisabled}>
            <a id="ControlBar-Next-Link" href={NextPage} aria-disabled={NextDisabled}>
                &gt; <br> Next Page
            </a>
        </button>
</div>