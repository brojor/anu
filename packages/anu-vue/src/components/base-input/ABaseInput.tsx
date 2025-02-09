import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { disabled, readonly } from '@/composables/useProps'
import TransitionExpand from '@/transitions/TransitionExpand.vue'

export const ABaseInput = defineComponent({
  name: 'ABaseInput',
  inheritAttrs: false,
  props: {
    inputWrapperClasses: [Array, String, Object] as PropType<string | string[] | object>,
    inputContainerAttrs: Object,
    hint: String,
    error: String,
    label: String,
    prependIcon: String,
    appendIcon: String,
    prependInnerIcon: String,
    appendInnerIcon: String,
    disabled,
    readonly,
  },
  setup(props, ctx) {
    const { expose } = ctx
    const iconTransition = 'transition duration-150 ease -in'
    const elementId = ctx.attrs.id || props.label ? `a-input-${ctx.attrs.id || props.label}` : undefined

    const refRoot = ref()
    const refInputContainer = ref()
    expose({
      refRoot,
      refInputContainer,
    })

    // TODO(Enhancement): We might need to remove absolute added to html input element to retain width instead of providing min-w to below wrapper
    // TODO: We need to improve default slot implementation so that we can provide selected slot to selection component
    return () => <div class={['a-base-input-root i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0', ctx.attrs.class ?? [], props.disabled && 'a-base-input-disabled ', (props.disabled || props.readonly) && 'pointer-events-none', !(props.disabled || props.readonly) && 'a-base-input-interactive']} ref={refRoot}>
            {/* 👉 Label */}
            {
                ctx.slots.label
                  ? ctx.slots.label?.()
                  : props.label
                    ? <label for={elementId} class={['a-base-input-label', props.error ? 'text-danger' : null]}>{props.label}</label>
                    : null
            }

            <div ref={refInputContainer} class="a-base-input-input-container flex items-center" {...props.inputContainerAttrs}>
                {/* 👉 Slot: Prepend */}
                {
                    ctx.slots.prepend
                      ? ctx.slots.prepend?.()
                      : props.prependIcon
                        ? <i class={[iconTransition, props.prependIcon]} />
                        : null
                }

                {/* SECTION Input wrapper */}
                <div class={[
                    `${props.error ? 'border-danger' : 'focus-within:border-primary'}`,
                    'a-base-input-input-wrapper relative i:focus-within:text-primary items-center border border-solid border-a-border w-full',
                    props.inputWrapperClasses,
                ]}>

                    {/* 👉 Slot: Prepend Inner */}
                    {
                        ctx.slots['prepend-inner']
                          ? ctx.slots['prepend-inner']?.()
                          : props.prependInnerIcon
                            ? <i class={['a-base-input-prepend-inner-icon inline-block', iconTransition, props.prependInnerIcon]} />
                            : null
                    }

                    {/* 👉 Slot: Default */}
                    {ctx.slots.default?.({
                      ...ctx.attrs,
                      class: [
                        'a-base-input-child w-full h-full absolute inset-0 rounded-inherit',
                        ctx.slots['prepend-inner'] || props.prependInnerIcon ? 'a-base-input-w-prepend-inner' : 'a-base-input-wo-prepend-inner',
                        ctx.slots['append-inner'] || props.appendInnerIcon ? 'a-base-input-w-append-inner' : 'a-base-input-wo-append-inner',
                      ],
                      id: elementId,
                    })}

                    {/* 👉 Slot: Append Inner */}
                    {
                        ctx.slots['append-inner']
                          ? ctx.slots['append-inner']?.()
                          : props.appendInnerIcon
                            ? <i class={['a-base-input-append-inner-icon inline-block ml-auto', iconTransition, props.appendInnerIcon]} />
                            : null
                    }
                </div>
                {/* !SECTION */}

                {/* 👉 Slot: Append */}
                {
                    ctx.slots.append
                      ? ctx.slots.append?.()
                      : props.appendIcon
                        ? <i class={[iconTransition, props.appendIcon]} />
                        : null
                }
            </div>
            {/* 👉 Slot: Bottom */}
            {
                ctx.slots.bottom
                  ? ctx.slots.bottom?.()
                  : <TransitionExpand>
                      <div class="h-8" v-show={props.error || props.hint}>
                        <small class={`inline-block ${props.error ? 'text-danger' : 'text-light-emphasis'}`}>{props.error || props.hint}</small>
                    </div>
                  </TransitionExpand>
            }
        </div>
  },
})

export type ABaseInput = InstanceType<typeof ABaseInput>
