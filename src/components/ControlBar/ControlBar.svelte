<script lang="ts">
    import data from '../../data/gallery.json'
    import "./ControlBar.less"

    let buttons = []

    for(let i = 0;i<data.length;i++){
        buttons.push(data[i].page)
    }

</script>

<div id="Control-BackPlate">
    <div id="ControlBar">
        <a href="/Gallery">
            Home
        </a>
        {#each buttons as link}
            <a href={"/Gallery/Page-"+link}>
                {link}
            </a>
        {/each}
    </div>
</div>