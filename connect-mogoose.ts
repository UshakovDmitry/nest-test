/* Переопределение стиля для .a, когда установлен errorText */
.input-error:focus-within {
    border: 1px solid var(--border-error, #F3B0A2);
    box-shadow: none;
}

/* Переопределение стиля для .a, когда disabled */
.a[disabled]:focus-within,
.a[aria-disabled="true"]:focus-within {
    border: 1px solid rgba(35, 54, 45, 0.12);
    box-shadow: none;
}
