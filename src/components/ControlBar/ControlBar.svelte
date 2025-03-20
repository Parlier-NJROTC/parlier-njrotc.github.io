<script lang="ts">
    import data from '../../data/gallery.json';
    import "./ControlBar.less";

    export let CurrentPageNum: number;

    interface PageButton {
        page: number;
        isCurrent: boolean;
        href: string;
    }

    const buttons: PageButton[] = data.map(item => ({
        page: item.page,
        isCurrent: item.page === CurrentPageNum,
        href: `/Gallery/Page-${item.page}`
    }));
</script>

<div id="Control-BackPlate">
    <div id="ControlBar">
        <a href="/Gallery" class="control-link" aria-current={CurrentPageNum === 0 ? 'page' : undefined}>
            Home
        </a>
        {#each buttons as button}
            <a
                href={button.isCurrent ? 'javascript:void(0);' : button.href}
                id={button.isCurrent ? `ControlBar-Button${CurrentPageNum}` : ''}
                class="control-link"
                aria-current={button.isCurrent ? 'page' : undefined}
                on:click|preventDefault={button.isCurrent ? (e) => e.preventDefault() : null}
            >
                {button.page}
            </a>
        {/each}
    </div>
</div>